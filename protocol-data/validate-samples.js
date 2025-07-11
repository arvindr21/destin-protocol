#!/usr/bin/env node

/**
 * DESTIN Protocol Sample Validation Script
 * 
 * This script automatically discovers and validates all sample JSON files against their corresponding schemas
 * to ensure they comply with the DESTIN protocol specification.
 *
 * Now supports versioned directories via --version argument (e.g., --version v0.2)
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv/dist/2020').default;
const addFormats = require('ajv-formats');

const protocolDataDir = __dirname;
function getLatestVersionDir() {
  const versionDirs = fs.readdirSync(protocolDataDir)
    .filter(name => /^v\d+\.\d+/.test(name));
  if (versionDirs.length === 0) return 'v0.1';
  // Sort using semantic versioning
  versionDirs.sort((a, b) => {
    const pa = a.replace('v', '').split('.').map(Number);
    const pb = b.replace('v', '').split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const na = pa[i] || 0;
      const nb = pb[i] || 0;
      if (na !== nb) return na - nb;
    }
    return 0;
  });
  return versionDirs[versionDirs.length - 1];
}

// Parse version argument
const argv = process.argv;
let version;
const versionArgIndex = argv.findIndex(arg => arg === '--version');
if (versionArgIndex !== -1 && argv[versionArgIndex + 1]) {
  version = argv[versionArgIndex + 1];
} else {
  version = getLatestVersionDir();
  console.log(`\x1b[33m[info]\x1b[0m No --version specified. Auto-selected latest version: ${version}`);
}

const baseDir = path.join(__dirname, version);
const schemasDir = path.join(baseDir, 'schemas');
const samplesDir = path.join(baseDir, 'samples');

// Initialize Ajv with JSON Schema 2020-12 support
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strict: false,
  strictSchema: false,
  allowUnionTypes: true
});
addFormats(ajv);

// Track loaded schemas to avoid duplicates
const loadedSchemas = new Set();
const compiledValidators = {};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = '') {
  console.log(`${color}${message}${colors.reset}`);
}

function discoverSamples() {
  if (!fs.existsSync(samplesDir)) {
    log(`Samples directory not found: ${samplesDir}`, colors.red);
    process.exit(1);
  }
  // Discover both valid and invalid samples
  const allFiles = fs.readdirSync(samplesDir);
  const validSamples = allFiles.filter(file => file.endsWith('.sample.json') && !file.endsWith('.invalid.sample.json'));
  const invalidSamples = allFiles.filter(file => file.endsWith('.invalid.sample.json'));
  return { validSamples, invalidSamples };
}

function mapSampleToSchema(sampleName) {
  // Remove .invalid if present
  const baseName = sampleName.replace('.invalid', '');
  // Handle special cases where multiple samples use the same schema
  const specialMappings = {
    'domain-profile.law': 'domain-profile',
    'domain-profile.governance': 'domain-profile',
    'audit-log.did_peer_1234abcd': 'audit-log',
    'interoperability-export.did_peer_1234abcd': 'interoperability-export',
    'domain-profile': 'domain-profile',
    'audit-log': 'audit-log',
    'interoperability-export': 'interoperability-export'
  };
  if (specialMappings[baseName]) {
    return specialMappings[baseName];
  }
  // Default mapping: sample name maps to schema name
  return baseName;
}

function loadSchema(schemaFile) {
  const schemaPath = path.join(schemasDir, `${schemaFile}.json`);
  
  try {
    const schemaData = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    
    // Only add schema if not already loaded
    if (schemaData.$id && !loadedSchemas.has(schemaData.$id)) {
      ajv.addSchema(schemaData);
      loadedSchemas.add(schemaData.$id);
    }
    
    return schemaData;
  } catch (error) {
    throw new Error(`Failed to load schema ${schemaFile}.json: ${error.message}`);
  }
}

function validateSample(sampleFile, schemaFile) {
  const samplePath = path.join(samplesDir, `${sampleFile}.sample.json`);
  
  try {
    // Read and parse sample
    const sampleData = JSON.parse(fs.readFileSync(samplePath, 'utf8'));
    
    // Load schema (will only load once per unique $id)
    const schemaData = loadSchema(schemaFile);
    
    // Compile schema only once per schema file
    if (!compiledValidators[schemaFile]) {
      compiledValidators[schemaFile] = ajv.compile(schemaData);
    }
    const validate = compiledValidators[schemaFile];
    
    const isValid = validate(sampleData);
    
    if (isValid) {
      log(`✅ ${sampleFile}.sample.json is valid`, colors.green);
      return { valid: true, errors: null };
    } else {
      log(`❌ ${sampleFile}.sample.json has validation errors:`, colors.red);
      validate.errors.forEach(error => {
        log(`   - ${error.instancePath || 'root'}: ${error.message}`, colors.red);
      });
      return { valid: false, errors: validate.errors };
    }
  } catch (error) {
    log(`💥 Error processing ${sampleFile}.sample.json: ${error.message}`, colors.red);
    return { valid: false, errors: [error] };
  }
}

function main() {
  log('🔍 DESTIN Protocol Sample Validation', colors.bold + colors.blue);
  log('=====================================', colors.blue);
  log(`Version: ${version}\n`, colors.yellow);

  // Discover all sample files
  const { validSamples, invalidSamples } = discoverSamples();
  const sampleFiles = [...validSamples, ...invalidSamples];

  if (sampleFiles.length === 0) {
    log('⚠️  No sample files found in samples/ directory', colors.yellow);
    process.exit(0);
  }

  log(`📁 Found ${sampleFiles.length} sample files:`, colors.blue);
  sampleFiles.forEach(file => log(`   - ${file}`, colors.blue));
  log('');

  const results = [];
  let totalSamples = 0;
  let validSamplesCount = 0;
  let invalidSamplesCount = 0;
  let falsePositives = 0;
  let falseNegatives = 0;

  // Validate valid samples (should PASS)
  for (const file of validSamples) {
    totalSamples++;
    const sampleName = file.replace('.sample.json', '');
    const schemaFile = mapSampleToSchema(sampleName);
    log(`Validating (should PASS) ${file} against ${schemaFile}.json...`, colors.yellow);
    const result = validateSample(sampleName, schemaFile);
    results.push({ file, schemaFile, expected: 'valid', ...result });
    if (result.valid) {
      validSamplesCount++;
    } else {
      falseNegatives++;
      log(`❌ False negative: ${file} should be valid but failed validation.`, colors.red);
    }
    log('');
  }

  // Validate invalid samples (should FAIL)
  for (const file of invalidSamples) {
    totalSamples++;
    const sampleName = file.replace('.invalid.sample.json', '');
    const schemaFile = mapSampleToSchema(sampleName);
    log(`Validating (should FAIL) ${file} against ${schemaFile}.json...`, colors.yellow);
    const result = validateSample(sampleName + '.invalid', schemaFile);
    results.push({ file, schemaFile, expected: 'invalid', ...result });
    if (!result.valid) {
      invalidSamplesCount++;
    } else {
      falsePositives++;
      log(`❌ False positive: ${file} should be invalid but passed validation.`, colors.red);
    }
    log('');
  }

  // Summary
  log('📊 Validation Summary', colors.bold + colors.blue);
  log('====================', colors.blue);
  log(`Total samples: ${totalSamples}`, colors.blue);
  log(`Valid samples (expected pass): ${validSamplesCount}`, colors.green);
  log(`Invalid samples (expected fail): ${invalidSamplesCount}`, colors.green);
  log(`False positives (invalid but passed): ${falsePositives}`, colors.red);
  log(`False negatives (valid but failed): ${falseNegatives}`, colors.red);

  if (falsePositives === 0 && falseNegatives === 0) {
    log('\n🎉 All samples behaved as expected!', colors.bold + colors.green);
    process.exit(0);
  } else {
    log('\n⚠️  Some samples did not behave as expected. Please review errors above.', colors.bold + colors.yellow);
    process.exit(1);
  }
}

// Run validation if this script is executed directly
if (require.main === module) {
  main();
}

module.exports = { validateSample, discoverSamples, mapSampleToSchema }; 
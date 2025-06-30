#!/usr/bin/env node

/**
 * DESTIN Protocol Sample Validation Script
 * 
 * This script automatically discovers and validates all sample JSON files against their corresponding schemas
 * to ensure they comply with the DESTIN protocol specification.
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv/dist/2020').default;
const addFormats = require('ajv-formats');

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
  const samplesDir = path.join(__dirname, 'samples');
  const sampleFiles = fs.readdirSync(samplesDir)
    .filter(file => file.endsWith('.sample.json'))
    .map(file => file.replace('.sample.json', ''));

  return sampleFiles;
}

function mapSampleToSchema(sampleName) {
  // Handle special cases where multiple samples use the same schema
  const specialMappings = {
    'domain-profile.law': 'domain-profile',
    'domain-profile.governance': 'domain-profile',
    'audit-log.did_peer_1234abcd': 'audit-log',
    'interoperability-export.did_peer_1234abcd': 'interoperability-export'
  };

  if (specialMappings[sampleName]) {
    return specialMappings[sampleName];
  }

  // Default mapping: sample name maps to schema name
  return sampleName;
}

function loadSchema(schemaFile) {
  const schemaPath = path.join(__dirname, 'schemas', `${schemaFile}.json`);
  
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
  const samplePath = path.join(__dirname, 'samples', `${sampleFile}.sample.json`);
  
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
  log('=====================================\n', colors.blue);
  
  // Discover all sample files
  const sampleFiles = discoverSamples();
  
  if (sampleFiles.length === 0) {
    log('⚠️  No sample files found in samples/ directory', colors.yellow);
    process.exit(0);
  }
  
  log(`📁 Found ${sampleFiles.length} sample files:`, colors.blue);
  sampleFiles.forEach(file => log(`   - ${file}.sample.json`, colors.blue));
  log('');
  
  const results = [];
  let totalSamples = 0;
  let validSamples = 0;
  
  for (const sampleFile of sampleFiles) {
    totalSamples++;
    const schemaFile = mapSampleToSchema(sampleFile);
    
    log(`Validating ${sampleFile}.sample.json against ${schemaFile}.json...`, colors.yellow);
    
    const result = validateSample(sampleFile, schemaFile);
    results.push({ sampleFile, schemaFile, ...result });
    
    if (result.valid) {
      validSamples++;
    }
    
    log(''); // Empty line for readability
  }
  
  // Summary
  log('📊 Validation Summary', colors.bold + colors.blue);
  log('====================', colors.blue);
  log(`Total samples: ${totalSamples}`, colors.blue);
  log(`Valid samples: ${validSamples}`, colors.green);
  log(`Invalid samples: ${totalSamples - validSamples}`, colors.red);
  
  if (validSamples === totalSamples) {
    log('\n🎉 All samples are valid!', colors.bold + colors.green);
    process.exit(0);
  } else {
    log('\n⚠️  Some samples have validation errors. Please fix them.', colors.bold + colors.yellow);
    process.exit(1);
  }
}

// Run validation if this script is executed directly
if (require.main === module) {
  main();
}

module.exports = { validateSample, discoverSamples, mapSampleToSchema }; 
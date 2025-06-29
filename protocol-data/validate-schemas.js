#!/usr/bin/env node

/**
 * Schema Validation Script
 * 
 * This script validates that all JSON schemas in the protocol-data/schemas/
 * directory are syntactically correct and follow the expected structure.
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

// Initialize Ajv for schema validation
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strict: false
});
addFormats(ajv);

// Schema directory
const SCHEMAS_DIR = path.join(__dirname, 'schemas');
const SCHEMA_INDEX_FILE = path.join(SCHEMAS_DIR, 'schema-index.json');

/**
 * Validate a single JSON schema file
 */
function validateSchemaFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const schema = JSON.parse(content);
    
    // Basic schema validation
    if (!schema.$schema) {
      throw new Error('Missing $schema field');
    }
    
    if (!schema.title && !schema.description) {
      console.warn(`Warning: Schema ${path.basename(filePath)} has no title or description`);
    }
    
    // Try to compile the schema with Ajv
    const validate = ajv.compile(schema);
    
    console.log(`✅ Validated schema: ${path.basename(filePath)}`);
    return { valid: true, file: filePath };
    
  } catch (error) {
    console.error(`❌ Invalid schema ${path.basename(filePath)}: ${error.message}`);
    return { valid: false, file: filePath, error: error.message };
  }
}

/**
 * Validate schema index file
 */
function validateSchemaIndex() {
  try {
    if (!fs.existsSync(SCHEMA_INDEX_FILE)) {
      console.error('❌ Schema index file not found');
      return { valid: false, error: 'Schema index file not found' };
    }
    
    const content = fs.readFileSync(SCHEMA_INDEX_FILE, 'utf8');
    const index = JSON.parse(content);
    
    if (!index.schemas || !Array.isArray(index.schemas)) {
      throw new Error('Schema index must contain a "schemas" array');
    }
    
    // Validate each schema reference
    for (const schemaRef of index.schemas) {
      if (!schemaRef.name || !schemaRef.file) {
        throw new Error('Each schema reference must have "name" and "file" fields');
      }
      
      const schemaPath = path.join(SCHEMAS_DIR, schemaRef.file);
      if (!fs.existsSync(schemaPath)) {
        throw new Error(`Referenced schema file not found: ${schemaRef.file}`);
      }
    }
    
    console.log('✅ Validated schema index');
    return { valid: true };
    
  } catch (error) {
    console.error(`❌ Invalid schema index: ${error.message}`);
    return { valid: false, error: error.message };
  }
}

/**
 * Main validation function
 */
function main() {
  console.log('🔍 Validating JSON schemas...\n');
  
  let allValid = true;
  const results = [];
  
  // Validate schema index first
  const indexResult = validateSchemaIndex();
  results.push(indexResult);
  if (!indexResult.valid) {
    allValid = false;
  }
  
  // Find and validate all schema files
  if (fs.existsSync(SCHEMAS_DIR)) {
    const files = fs.readdirSync(SCHEMAS_DIR);
    const schemaFiles = files.filter(file => file.endsWith('.json') && file !== 'schema-index.json');
    
    if (schemaFiles.length === 0) {
      console.log('⚠️  No schema files found');
    } else {
      console.log(`Found ${schemaFiles.length} schema files to validate:\n`);
      
      for (const file of schemaFiles) {
        const filePath = path.join(SCHEMAS_DIR, file);
        const result = validateSchemaFile(filePath);
        results.push(result);
        
        if (!result.valid) {
          allValid = false;
        }
      }
    }
  } else {
    console.error('❌ Schemas directory not found');
    allValid = false;
  }
  
  // Summary
  console.log('\n📊 Validation Summary:');
  const validCount = results.filter(r => r.valid).length;
  const totalCount = results.length;
  
  console.log(`Valid schemas: ${validCount}/${totalCount}`);
  
  if (allValid) {
    console.log('\n✅ All schemas are valid!');
    process.exit(0);
  } else {
    console.log('\n❌ Some schemas have validation errors');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { validateSchemaFile, validateSchemaIndex, main }; 
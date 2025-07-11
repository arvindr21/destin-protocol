# DESTIN Protocol JSON Schemas

This directory contains comprehensive JSON Schema definitions for all DESTIN protocol data structures. These schemas ensure data integrity, provide validation, and serve as authoritative documentation for the protocol's data formats.

## Schema Files

### Core Protocol Schemas

- **`agent-definition.json`** - Agent identity and metadata structure
- **`domain-profile.json`** - Domain-specific configuration and trait weights
- **`audit-log.json`** - Score update and event logging format
- **`anti-manipulation-policy.json`** - Manipulation prevention configuration
- **`interoperability-export.json`** - Cross-system reputation export format

### Validation Schemas

- **`cadm-mode-selection.json`** - Context-Aware Dialogue Mode selection events
- **`dwip-influence-calculation.json`** - Domain-Weighted Influence Protocol calculations
- **`dip-proposal.json`** - DESTIN Improvement Proposal format

### Index and Documentation

- **`schema-index.json`** - Central registry of all schemas with metadata
- **`README.md`** - This documentation file

## Schema Features

### Validation Rules

Each schema includes comprehensive validation:

- **Type checking** for all fields
- **Required field enforcement** for critical data
- **Format validation** for dates, URIs, and other structured data
- **Enum constraints** for controlled vocabularies
- **Nested object validation** for complex structures

### Documentation

Schemas serve as living documentation:

- **Field descriptions** explain each property's purpose
- **Examples** demonstrate proper usage patterns
- **Error messages** provide helpful validation feedback
- **Cross-references** link related schema components

### Extensibility

Schemas are designed for protocol evolution:

- **Optional fields** allow backward compatibility
- **Version metadata** tracks schema evolution
- **Extension points** support future protocol features
- **Default values** provide sensible fallbacks

## Usage

### Validation

Use these schemas with any JSON Schema validator:

```bash
# Validate a sample file
ajv validate -s schemas/agent-definition.json -d samples/agent-definition.sample.json

# Or use the automated validation script
npm run validate-samples
```

### Integration

Schemas can be integrated into:

- **API validation** for request/response validation
- **Database constraints** for data integrity
- **Code generation** for type-safe implementations
- **Documentation** for developer reference

## Schema Standards

All schemas follow:

- **JSON Schema 2020-12** specification
- **Consistent naming** conventions
- **Comprehensive examples** for all structures
- **Clear descriptions** for all fields
- **Proper error messages** for validation failures

## Contributing

When adding or modifying schemas:

1. **Follow the existing patterns** for consistency
2. **Include comprehensive examples** in the schema
3. **Add corresponding sample files** for testing
4. **Update the schema index** to include new schemas
5. **Run validation** to ensure compatibility

## Related Files

- **Samples**: See [`../samples/`](../samples/) for example data files
- **Validation**: See [`../validate-samples.js`](../validate-samples.js) for automated validation
- **Specification**: See [`../../spec/destin-v0.1.md`](../../spec/destin-v0.1.md) for protocol details

# DESTIN Protocol Data

This directory contains the core data structures, schemas, and validation tools for the DESTIN protocol.

## Structure

- **`schemas/`** - JSON Schema definitions for all protocol data structures
- **`samples/`** - Example JSON files demonstrating valid protocol data
- **`validate-samples.js`** - Automated validation script

## Validation

The `validate-samples.js` script automatically discovers and validates all sample files against their corresponding schemas:

```bash
# Run validation
node validate-samples.js

# Or use npm script
npm run validate-samples
```

### Features

- **Automatic Discovery**: Finds all `.sample.json` files in the `samples/` directory
- **Smart Mapping**: Maps sample files to their corresponding schemas (handles special cases like DID-specific filenames)
- **Performance Optimized**: Caches compiled validators and avoids duplicate schema loading
- **Comprehensive Reporting**: Shows detailed validation results with clear error messages

### Example Output

```
🔍 Validating protocol samples...

✅ agent-definition.sample.json
✅ domain-profile.law.sample.json
✅ domain-profile.governance.sample.json
✅ audit-log.did_peer_1234abcd.sample.json
✅ anti-manipulation-policy.sample.json
✅ interoperability-export.did_peer_1234abcd.sample.json
✅ cadm-mode-selection.sample.json
✅ dwip-influence-calculation.sample.json
✅ dip-proposal.sample.json

🎉 All 9 samples validated successfully!
```

## Schema Documentation

Each schema includes:

- **Comprehensive validation rules** for all protocol data structures
- **Example data** demonstrating proper usage
- **Field descriptions** explaining each property's purpose
- **Type constraints** ensuring data integrity

## Sample Files

The sample files demonstrate realistic usage of the protocol:

- **Agent definitions** with identity and metadata
- **Domain profiles** showing trait weight configurations
- **Audit logs** with score update events
- **Anti-manipulation policies** for security
- **Interoperability exports** for cross-system reputation
- **CADM mode selections** for dialogue context
- **DWIP influence calculations** for decision weighting
- **DIP proposals** for protocol governance

## Integration

These schemas and samples are referenced throughout the main specification and serve as the authoritative source for protocol data formats.

## Validation Rules

All samples must:

- ✅ Comply with their corresponding JSON schemas
- ✅ Use valid domain tags from the registry
- ✅ Follow DESTIN naming conventions
- ✅ Include required fields and proper data types
- ✅ Demonstrate realistic usage patterns

## Contributing

When adding new protocol features:

1. Create/update schemas in `schemas/`
2. Add corresponding samples in `samples/`
3. Update the validation script mapping if needed
4. Run validation to ensure compliance

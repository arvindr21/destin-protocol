# DESTIN Protocol Data (Versioned)

[![Schema & Sample Validation](https://github.com/arvindr21/destin-protocol/actions/workflows/schema-validation.yml/badge.svg)](https://github.com/arvindr21/destin-protocol/actions/workflows/schema-validation.yml)

This directory contains versioned protocol data, schemas, and validation tools for the DESTIN protocol, mapped to the corresponding protocol specification in the `spec/` folder.

## Structure

- `v0.1/` — Data, schemas, and samples for DESTIN v0.1 (see `spec/destin-v0.1.md`)
- `v0.2/` — Data, schemas, and samples for DESTIN v0.2 (see `spec/destin-v0.2.md`)
- `validate-samples.js` — Shared validation script (see below)

## CI & Validation

- The [Schema & Sample Validation workflow](https://github.com/arvindr21/destin-protocol/actions/workflows/schema-validation.yml) runs automatically on every push and pull request, and nightly.
- The badge above reflects the current status of all schema and sample validations.

### Running Validation Locally

To validate samples for a specific version, use:

```bash
node protocol-data/validate-samples.js --version v0.1
node protocol-data/validate-samples.js --version v0.2
```

To validate the latest available version (auto-detected):

```bash
node protocol-data/validate-samples.js
```

Or use the npm script:

```bash
npm run validate-samples
```

If no version is specified, the script will auto-select the latest version and print an info message.

## Version Mapping

- `v0.1/` → `spec/destin-v0.1.md`

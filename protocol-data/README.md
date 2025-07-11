# DESTIN Protocol Data (Versioned)

This directory contains versioned protocol data, schemas, and validation tools for the DESTIN protocol, mapped to the corresponding protocol specification in the `spec/` folder.

## Structure

- `v0.1/` — Data, schemas, and samples for DESTIN v0.1 (see `spec/destin-v0.1.md`)
- `v0.2/` — Data, schemas, and samples for DESTIN v0.2 (see `spec/destin-v0.2.md`)
- `validate-samples.js` — Shared validation script (see below)

## Validation

To validate samples for a specific version, use:

```bash
node protocol-data/validate-samples.js --version v0.1
node protocol-data/validate-samples.js --version v0.2
```

If no version is specified, the script defaults to `v0.1`.

## Version Mapping

- `v0.1/` → `spec/destin-v0.1.md`
- `v0.2/` → `spec/destin-v0.2.md`

Each versioned folder contains:

- `schemas/` — JSON Schema definitions for that spec version
- `samples/` — Example JSON files for that spec version
- `README.md` — Details for that version

## Adding a New Version

1. Copy the previous versioned folder (e.g., `v0.1/`) to a new version (e.g., `v0.3/`).
2. Update schemas and samples as needed for the new spec.
3. Update the mapping in this README.

## Notes

- The validation script only checks samples/schemas within the specified version.
- Each versioned folder is self-contained and should match the corresponding spec in `spec/`.

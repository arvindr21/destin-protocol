# DESTIN Protocol – Samples

This folder contains realistic example JSON files demonstrating how the DESTIN Protocol structures agent identity, reputation, domain scoring logic, audit logging, and interoperability artifacts.

These samples are **informative**, not normative, and intended to help implementers, validators, and tool builders understand how to model and exchange DESTIN-compatible data.

---

## 📁 File Index

| File Name                                               | Purpose                                                 |
| ------------------------------------------------------- | ------------------------------------------------------- |
| `agent-definition.sample.json`                          | Canonical identity + metadata + current profile         |
| `domain-profile.law.sample.json`                        | Legal domain configuration with trait weights           |
| `domain-profile.governance.sample.json`                 | Governance domain setup with collaboration focus        |
| `audit-log.did_peer_1234abcd.sample.json`               | Reputation score update events with full audit trail    |
| `anti-manipulation-policy.sample.json`                  | Anti-gaming and collusion prevention rules              |
| `interoperability-export.did_peer_1234abcd.sample.json` | Cross-system reputation export with cryptographic proof |
| `cadm-mode-selection.sample.json`                       | Dialogue mode selection with agent voting               |
| `dwip-influence-calculation.sample.json`                | Influence weight computation with trait aggregation     |
| `dip-proposal.sample.json`                              | Protocol improvement proposal with governance metadata  |

## 🔍 Validation

All samples are automatically validated against their corresponding schemas:

```bash
# Run validation from project root
npm run validate-samples

# Or run directly
cd protocol-data
node validate-samples.js
```

### Validation Features

- **Automatic Discovery**: Finds all `.sample.json` files
- **Smart Mapping**: Handles DID-specific filenames and domain variants
- **Schema Compliance**: Validates against JSON Schema 2020-12
- **Performance Optimized**: Caches validators for speed

## 📋 Sample Details

### Agent Definition

- Complete agent identity with DID and public key
- Optional metadata and namespace aliases
- Domain tags for specialization

### Domain Profiles

- Trait weight configurations per domain
- Default CADM mode assignments
- Scoring modifier examples

### Audit Logs

- Reputation score update events
- Cryptographic signatures and timestamps
- Full provenance trail

### Anti-Manipulation Policy

- Rate limiting and confidence weighting
- Anomaly detection thresholds
- Trust radius configurations

### Interoperability Export

- Signed reputation vector export
- Cross-system compatibility metadata
- Cryptographic proof of authenticity

### CADM Mode Selection

- Agent voting on dialogue modes
- Domain-specific mode preferences
- Meta-debate resolution examples

### DWIP Influence Calculation

- Trait aggregation with domain weights
- Confidence and decay factors
- Influence weight computation

### DIP Proposal

- Protocol improvement proposals
- Governance metadata and voting
- Implementation timeline

## 🎯 Usage Notes

- **DID-Specific Names**: Some samples use DID-specific filenames (e.g., `audit-log.did_peer_1234abcd.sample.json`) to demonstrate real-world usage patterns
- **CADM Modes**: All samples use standardized CADM mode names: `resolution`, `synthesis`, `debate`
- **Optional Fields**: Samples include optional fields to demonstrate schema capabilities
- **Realistic Data**: All examples use realistic values that would be found in production systems

## 🔗 Related Files

- **Schemas**: See [`../schemas/`](../schemas/) for JSON Schema definitions
- **Validation**: See [`../validate-samples.js`](../validate-samples.js) for validation script
- **Specification**: See [`../../spec/destin-v0.1.md`](../../spec/destin-v0.1.md) for protocol details

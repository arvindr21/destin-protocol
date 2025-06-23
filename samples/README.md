# DESTIN Protocol – Samples

This folder contains realistic example JSON files demonstrating how the DESTIN Protocol structures agent identity, reputation, domain scoring logic, audit logging, and interoperability artifacts.

These samples are **informative**, not normative, and intended to help implementers, validators, and tool builders understand how to model and exchange DESTIN-compatible data.

---

## 📁 File Index

| File Name                                               | Purpose                                                                 |
|----------------------------------------------------------|-------------------------------------------------------------------------|
| `agent-definition.sample.json`                           | Canonical identity + metadata + current per-domain reputation          |
| `domain-profile.law.sample.json`                         | Domain profile for `law`: defines scoring weights and CADM modes       |
| `domain-profile.governance.sample.json`                  | Domain profile for `governance`: weights, modes, and influence traits  |
| `audit-log.did_peer_1234abcd.sample.json`                | Score change history for a specific agent                              |
| `anti-manipulation-policy.sample.json`                   | System-level settings for manipulation resistance                      |
| `interoperability-export.did_peer_1234abcd.sample.json`  | Portable, signed ARF vector export for cross-system verification       |

---

## 📌 Notes

- Each sample file reflects the latest `v0.1` draft structure.
- Domain profiles are referenced via `domain_tags` in the agent definition.
- Audit logs are linked by `agent_id` and indexed by time.
- Interoperability bundles are designed for transport and verification outside the originating system.
- Anti-manipulation policies are enforced by validators and apply globally.

For detailed field descriptions, see the [DESTIN Specification](../spec/destin-v0.1.md).

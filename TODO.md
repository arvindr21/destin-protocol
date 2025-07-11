# DESTIN Protocol - Draft 0.2 TODO Breakdown (Execution-Ready)

This document contains a complete, actionable breakdown of all tasks in the DESTIN Protocol roadmap. Each task is detailed to be independently executable by collaborators. The goal is to build a complete, practical, and robust multi-agent protocol.

---

## 🧪 Milestone 1: Validator Core

### 1. Agent JSON Schema

* [x] Status: Already defined in `protocol-data/schemas/agent-definition.json`
* [x] Ensure schema is tested using `validate-schemas.js`
* [x] Cross-reference with sample: `samples/agent-definition.sample.json`

### 2. Score Update Engine

* [ ] Implement logic to apply a score delta to an agent's ARF vector.
* [ ] Must support decay functions (`exp(-λ * t)`), domain scoping, trait weighting.
* [ ] Output: TypeScript or Python module with `applyScoreUpdate()` function.
* [ ] Bonus: Build score evolution history from audit log (`audit-log.did_peer_1234abcd.sample.json`)

### 3. DWIP Pseudocode

* [ ] Write detailed pseudocode to calculate agent influence using DWIP rules.
* [ ] Inputs: ARF traits, trait weights, confidence levels, CADM mode.
* [ ] Output: `calculateInfluence(agent, domainProfile)` logic.
* [ ] Sample exists in `samples/dwip-influence-calculation.sample.json`

### 4. Conformance Tests

* [ ] Extend `validate-samples.js` to run a full conformance test suite.
* [ ] Include: valid/invalid agent definitions, domain profiles, DWIP calculations.
* [ ] Add CI test badge + instructions in `protocol-data/README.md`

---

## 🤖 Milestone 2: Reference Agent + Dialogue Engine

### 1. Dialogue Mode FSM

* [ ] Model state transitions: `started -> paused -> resolved`, `started -> meta-debate -> resumed`.
* [ ] Implement as JSON-based FSM or `xstate`/equivalent.
* [ ] Link with `cadm-mode-selection.sample.json`
* [ ] Output: FSM diagram + code.

### 2. CADM Mode Switcher

* [ ] Build function: `selectCADMMode(dialogueContext)`
* [ ] Inputs: domain, volatility score, agent votes, prior mode
* [ ] Output: computed CADM mode
* [x] Schema exists in: `schemas/cadm-mode-selection.json`
* [ ] Add validation test against `cadm-mode-selection.sample.json`

### 3. Influence Calculator

* [ ] Build calculator based on DWIP pseudocode (above)
* [ ] Normalize scores, apply weights, use confidence multipliers
* [ ] Generate influence logs compatible with DWIP schema

---

## 🛡️ Milestone 3: Governance & Meta-Agent Layer

### 1. Meta-Agent Selection + Voting

* [ ] Specify council election rules
* [ ] Output: JSON structure for `meta-agent-election`
* [ ] Define eligibility based on domain profile + ARF thresholds
* [ ] Add schema for `meta-agent-election.json`

### 2. Dispute Resolution Path

* [ ] Define FSM for `challenge -> freeze -> validate -> verdict`
* [ ] Show sample arbitration case
* [ ] Model quorum/timeouts and appeal conditions

### 3. Validation Logging

* [x] Schema exists: `audit-log.json`
* [ ] Validate samples: `audit-log.did_peer_1234abcd.sample.json`
* [ ] Add Merkle chaining + validator signature proposal

---

## 🔄 Reference Implementation & Algorithms

* [ ] Pseudocode tasks:
  * [ ] ARF scoring w/ decay
  * [ ] DWIP weighted voting
  * [ ] CADM mode logic
  * [ ] Score normalization
* [ ] Simulation:
  * [ ] Two agents interact → ARF updates → DWIP arbitration

---

## ✅ Protocol Validation & Conformance

* [ ] Extend `validate-samples.js` and `validate-schemas.js`
* [ ] Define DESTIN-compliance levels (MVP, full compliance)
* [ ] Build CLI wrapper: `destin-validate path/to/sample.json`

---

## ⚖️ Event Model & State Machines

* [ ] Build FSMs for:
  * [ ] Agent lifecycle: `instantiated → active → flagged → retired`
  * [ ] Dialogue states (via CADM)
  * [ ] Dispute resolution
* [ ] Add as `.dot` or Mermaid diagrams

---

## 📄 Specification Completeness

* [x] `agent-definition.json`
* [x] `domain-profile.json`
* [x] `dwip-influence-calculation.json`
* [x] `cadm-mode-selection.json`
* [ ] Add diagrams to `spec/design-principles.md` linking CADM, ARF, DWIP
* [ ] Clarify: decay function reuse across modules

---

## ⏳ Versioning, Upgrades & DIP Process

* [x] Draft `dip-proposal.json` exists
* [ ] Add sample: `dip-proposal.sample.json`
* [ ] Define governance + version bump triggers

---

## 🏛️ Bootstrapping & Cold Start Strategy

* [ ] Define bootstrap score templates
* [ ] Simulate reputation ramp-up for new agents

---

## ⚡️ Reputation Drift Handling

* [ ] Add volatility metric to ARF vector
* [ ] Implement sliding window decay model

---

## 🛠️ Tooling / DevX

* [ ] Add NPM script: `yarn validate:samples`
* [ ] Package: CLI + schemas under `destin-protocol-tools`
* [ ] Autocomplete: VSCode extension from schema-index.json

---

## 🧰 Meta-Agent Layer & Governance

* [ ] Specify meta-agent election lifecycle
* [ ] Conflict of interest model
* [ ] Emergency override logic
* [ ] Propose schema for `meta-agent-governance.json`

---

## 📊 Logging & Audit Trail

* [ ] Extend audit log with:
  * [ ] Merkle root chaining
  * [ ] Event IDs w/ hash pointers
  * [ ] Validator sig support

---

## ⛓ Threat Model & Security

* [ ] Simulate attacks:
  * [ ] Sybil
  * [ ] Sockpuppet
  * [ ] Vote manipulation
* [ ] Document defenses using real examples

---

## 🤷 Computation & Enforcement

* [ ] Add spec doc: on-chain vs local compute
* [ ] Define validator roles per action

---

## 🛠 Interoperability

* [x] Use: `interoperability-export.json`
* [ ] Add adapter logic for BrightID, Ceramic, etc.

---

## 📢 Publication & Community Feedback

* [ ] Package `protocol-data` as tagged release
* [ ] Open issues tagged `feedback-wanted`
* [ ] Invite community on GitHub Discussions

---

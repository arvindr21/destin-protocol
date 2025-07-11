# DESTIN Protocol - Draft 0.2 TODO Breakdown (Execution-Ready)

This document contains a complete, actionable breakdown of all tasks in the DESTIN Protocol roadmap. Each task is detailed to be independently executable by collaborators. The goal is to build a complete, practical, and robust multi-agent protocol.

---

## 🧪 Milestone 1: Validator Core

### 1. Agent JSON Schema

- [x] Status: Already defined in `protocol-data/schemas/agent-definition.json`
- [x] Ensure schema is tested using `validate-schemas.js`
- [x] Cross-reference with sample: `samples/agent-definition.sample.json`
  - **All complete.**

### 2. Score Update Engine

- [x] Implement logic to apply a score delta to an agent's ARF vector.
  - **Done:** See Section 9.2.1 in `spec/destin-v0.2.md`.
- [x] Must support decay functions (`exp(-λ * t)`), domain scoping, trait weighting.
  - **Done:** Fully described in the spec.
- [ ] Output: TypeScript or Python module with `applyScoreUpdate()` function.
  - **To do:** Implement the algorithm from Section 9.2.1 as a function (suggested: `src/engine/applyScoreUpdate.ts`). Inputs: agent, domain, trait, delta, timestamp, domainProfile. Logic: Apply decay, trait weighting, update ARF vector, and log the update. Add unit tests for correctness.
- [x] Bonus: Build score evolution history from audit log (`audit-log.did_peer_1234abcd.sample.json`)
  - **Done:** Spec describes audit log replay for score evolution (see Section 9.2.1 and 5.7).

### 3. DWIP Pseudocode

- [x] Write detailed pseudocode to calculate agent influence using DWIP rules.
- [x] Inputs: ARF traits, trait weights, confidence levels, CADM mode.
- [x] Output: `calculateInfluence(agent, domainProfile)` logic.
- [x] Sample exists in `samples/dwip-influence-calculation.sample.json`
  - **All complete.**

### 4. Conformance Tests

- [x] Extend `validate-samples.js` to run a full conformance test suite.
- [x] Include: valid/invalid agent definitions, domain profiles, DWIP calculations.
- [x] Add CI test badge + instructions in `protocol-data/README.md`
  - **All complete.**

---

## 🤖 Milestone 2: Reference Agent + Dialogue Engine

### 1. Dialogue Mode FSM

- [ ] Model state transitions: `started -> paused -> resolved`, `started -> meta-debate -> resumed`.
  - **To do:** Define a finite state machine (FSM) for dialogue modes, covering all transitions. Reference: Section 7 (CADM) in the spec for mode transitions and triggers.
- [ ] Implement as JSON-based FSM or `xstate`/equivalent.
  - **To do:** Choose a format (JSON, xstate, or similar) and encode the FSM. Place in `src/` or `protocol-data/`.
- [ ] Link with `cadm-mode-selection.sample.json`
  - **To do:** Ensure the FSM logic is compatible with the sample structure. Add validation or mapping logic.
- [ ] Output: FSM diagram + code.
  - **To do:** Generate a diagram (Mermaid or similar) and include in the spec or as an artifact.

### 2. CADM Mode Switcher

- [ ] Build function: `selectCADMMode(dialogueContext)`
  - **To do:** Implement the mode selection logic as described in Section 7.3 of the spec. Inputs: domain, volatility score, agent votes, prior mode.
- [ ] Inputs: domain, volatility score, agent votes, prior mode
  - **To do:** Ensure the function accepts and uses these inputs.
- [ ] Output: computed CADM mode
  - **To do:** Return the selected mode, with rationale if possible.
- [x] Schema exists in: `schemas/cadm-mode-selection.json`
  - **Done.**
- [ ] Add validation test against `cadm-mode-selection.sample.json`
  - **To do:** Add a test to ensure the function’s output matches the sample schema.

### 3. Influence Calculator

- [ ] Build calculator based on DWIP pseudocode (above)
  - **To do:** Implement the `calculateInfluence` function as per Section 6.3.1. Inputs: agent, domainProfile, cadmMode, currentTime.
- [ ] Normalize scores, apply weights, use confidence multipliers
  - **To do:** Ensure normalization, weighting, and confidence logic are implemented.
- [ ] Generate influence logs compatible with DWIP schema
  - **To do:** Output should match the structure in `dwip-influence-calculation.sample.json`.

---

## 🛡️ Milestone 3: Governance & Meta-Agent Layer

### 1. Meta-Agent Selection + Voting

- [ ] Specify council election rules
  - **To do:** Formalize election rules as per Section 8.2–8.3 in the spec. Add to the spec or as a JSON schema.
- [ ] Output: JSON structure for `meta-agent-election`
  - **To do:** Define and document the structure.
- [ ] Define eligibility based on domain profile + ARF thresholds
  - **To do:** Specify eligibility logic (see Section 8.3.1).
- [ ] Add schema for `meta-agent-election.json`
  - **To do:** Create the schema in `protocol-data/schemas/`.

### 2. Dispute Resolution Path

- [ ] Define FSM for `challenge -> freeze -> validate -> verdict`
  - **To do:** Model the dispute resolution process as an FSM (see Section 10.2–10.4).
- [ ] Show sample arbitration case
  - **To do:** Create a sample JSON or scenario walkthrough.
- [ ] Model quorum/timeouts and appeal conditions
  - **To do:** Specify rules for quorum, timeouts, and appeals (see Section 8.4).

### 3. Validation Logging

- [x] Schema exists: `audit-log.json`
  - **Done.**
- [ ] Validate samples: `audit-log.did_peer_1234abcd.sample.json`
  - **To do:** Ensure sample is validated by the test suite.
- [ ] Add Merkle chaining + validator signature proposal
  - **To do:** Extend the audit log schema/spec to include Merkle root and validator signatures (see Section 11.3).

---

## 🔄 Reference Implementation & Algorithms

- [ ] Pseudocode tasks:
  - [ ] ARF scoring w/ decay
    - **To do:** Add explicit pseudocode for ARF scoring with decay (see Section 9.3).
  - [ ] DWIP weighted voting
    - **To do:** Add pseudocode for DWIP voting (see Section 6.3).
  - [ ] CADM mode logic
    - **To do:** Add pseudocode for CADM mode selection (see Section 7.3).
  - [ ] Score normalization
    - **To do:** Add pseudocode for normalization (see Section 9.5).
- [ ] Simulation:
  - [ ] Two agents interact → ARF updates → DWIP arbitration
    - **To do:** Implement a simulation script or notebook demonstrating the flow.

---

## ✅ Protocol Validation & Conformance

- [ ] Extend `validate-samples.js` and `validate-schemas.js`
  - **To do:** Add any new schemas/samples to validation.
- [ ] Define DESTIN-compliance levels (MVP, full compliance)
  - **To do:** Specify compliance levels in the spec or README.
- [ ] Build CLI wrapper: `destin-validate path/to/sample.json`
  - **To do:** Implement a CLI tool for validation.

---

## ⚖️ Event Model & State Machines

- [ ] Build FSMs for:
  - [ ] Agent lifecycle: `instantiated → active → flagged → retired`
    - **To do:** Model as FSM (diagram + code).
  - [ ] Dialogue states (via CADM)
    - **To do:** Model as FSM (diagram + code).
  - [ ] Dispute resolution
    - **To do:** Model as FSM (diagram + code).
- [ ] Add as `.dot` or Mermaid diagrams
  - **To do:** Generate and include diagrams in the spec.

---

## 📄 Specification Completeness

- [x] `agent-definition.json`
- [x] `domain-profile.json`
- [x] `dwip-influence-calculation.json`
- [x] `cadm-mode-selection.json`
- [ ] Add diagrams to `spec/design-principles.md` linking CADM, ARF, DWIP
  - **To do:** Create and embed diagrams showing relationships.
- [ ] Clarify: decay function reuse across modules
  - **To do:** Add a section or note in the spec about decay function reuse.

---

## ⏳ Versioning, Upgrades & DIP Process

- [x] Draft `dip-proposal.json` exists
- [ ] Add sample: `dip-proposal.sample.json`
  - **To do:** Create a sample file in `protocol-data/samples/`.
- [ ] Define governance + version bump triggers
  - **To do:** Specify in the spec when version bumps/governance actions are required.

---

## 🏛️ Bootstrapping & Cold Start Strategy

- [ ] Define bootstrap score templates
  - **To do:** Add templates for initial agent scores.
- [ ] Simulate reputation ramp-up for new agents
  - **To do:** Implement a simulation or describe the process.

---

## ⚡️ Reputation Drift Handling

- [ ] Add volatility metric to ARF vector
  - **To do:** Extend ARF vector and schema/spec.
- [ ] Implement sliding window decay model
  - **To do:** Add logic/spec for sliding window decay.

---

## 🛠️ Tooling / DevX

- [ ] Add NPM script: `yarn validate:samples`
  - **To do:** Add script to `package.json`.
- [ ] Package: CLI + schemas under `destin-protocol-tools`
  - **To do:** Bundle CLI and schemas as a package.
- [ ] Autocomplete: VSCode extension from schema-index.json
  - **To do:** Build or document VSCode extension.

---

## 🧰 Meta-Agent Layer & Governance

- [ ] Specify meta-agent election lifecycle
  - **To do:** Document lifecycle in the spec.
- [ ] Conflict of interest model
  - **To do:** Add model/spec for conflict of interest.
- [ ] Emergency override logic
  - **To do:** Specify override logic in the spec.
- [ ] Propose schema for `meta-agent-governance.json`
  - **To do:** Create schema in `protocol-data/schemas/`.

---

## 📊 Logging & Audit Trail

- [ ] Extend audit log with:
  - [ ] Merkle root chaining
    - **To do:** Add to schema/spec.
  - [ ] Event IDs w/ hash pointers
    - **To do:** Add to schema/spec.
  - [ ] Validator sig support
    - **To do:** Add to schema/spec.

---

## ⛓ Threat Model & Security

- [ ] Simulate attacks:
  - [ ] Sybil
  - [ ] Sockpuppet
  - [ ] Vote manipulation
    - **To do:** Implement or document simulations for each attack.
- [ ] Document defenses using real examples
  - **To do:** Add to spec or as case studies.

---

## 🤷 Computation & Enforcement

- [ ] Add spec doc: on-chain vs local compute
  - **To do:** Write a section comparing compute models.
- [ ] Define validator roles per action
  - **To do:** Specify in the spec.

---

## 🛠 Interoperability

- [x] Use: `interoperability-export.json`
- [ ] Add adapter logic for BrightID, Ceramic, etc.
  - **To do:** Implement/document adapter logic.

---

## 📢 Publication & Community Feedback

- [ ] Package `protocol-data` as tagged release
  - **To do:** Prepare and publish a release.
- [ ] Open issues tagged `feedback-wanted`
  - **To do:** Create and tag issues on GitHub.
- [ ] Invite community on GitHub Discussions
  - **To do:** Announce and invite participation.

---

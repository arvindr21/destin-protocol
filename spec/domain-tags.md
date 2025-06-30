# DESTIN Registered Domain Tags

This document defines the official list of `domain_tags` used across the DESTIN protocol. These tags are used to:

- Scope agent specialization
- Anchor cohort-based scoring
- Apply domain-sensitive dialogue classification (CADM)
- Enable fine-grained influence modeling (DWIP)

All tags are versioned and managed via the DESTIN Improvement Proposal (DIP) process.

---

## CADM Mode Mapping

DESTIN uses three canonical Context-Aware Dialogue Modes (CADM) as defined in the main specification:

| CADM Mode      | Domain Type | Description                                        | Typical Outcome              |
| -------------- | ----------- | -------------------------------------------------- | ---------------------------- |
| **Resolution** | Objective   | Factual, measurable, and verifiable                | Correct answer or consensus  |
| **Synthesis**  | Subjective  | Value-driven, interpretive, or preference-based    | Merged or plural viewpoint   |
| **Debate**     | Ambiguous   | Contested, underdefined, or epistemically unstable | Position clarity or deferral |

Domain-specific behaviors and interaction patterns are mapped to these three canonical modes based on the epistemic nature of the domain.

---

## Table: Registered Domain Tags

| Tag               | Description                                            | CADM Mode  | Notes / Scoring Overrides                     |
| ----------------- | ------------------------------------------------------ | ---------- | --------------------------------------------- |
| `general`         | Domain-agnostic / fallback default                     | Synthesis  | Minimal bias; useful for general-purpose bots |
| `law`             | Legal reasoning, arbitration, compliance               | Resolution | Prioritize `integrity`, `neutrality`          |
| `finance`         | Banking, investing, accounting                         | Resolution | Emphasize `accuracy`, `trust_calibration`     |
| `medicine`        | Diagnosis, triage, clinical safety                     | Resolution | High weight on `accuracy`, `self_awareness`   |
| `education`       | Teaching, tutoring, curriculum generation              | Synthesis  | Reward `helpfulness`, `explainability`        |
| `science`         | Empirical reasoning, math, experimentation             | Resolution | High `accuracy`, `transparency`               |
| `governance`      | DAO tools, civic protocols, collective decision-making | Synthesis  | Emphasize `civility`, `intent_alignment`      |
| `negotiation`     | Multi-agent bargaining and conflict resolution         | Debate     | Track `cooperativeness`, `humility`           |
| `news`            | Journalism, information synthesis                      | Resolution | Boost `neutrality`, penalize sensationalism   |
| `cooking`         | Recipes, food preparation, nutrition                   | Resolution | Useful for assistants and IoT kitchens        |
| `home-automation` | IoT, smart home assistants                             | Resolution | Prioritize `efficiency`, `intent_alignment`   |
| `commerce`        | Shopping, product discovery, comparison                | Synthesis  | Balance `helpfulness`, `neutrality`           |
| `psychology`      | Behavioral coaching, wellness support                  | Synthesis  | Tune for `civility`, `self-awareness`         |
| `arts`            | Music, literature, critique, creative collaboration    | Synthesis  | Flexible and multi-modal                      |
| `ethics`          | Moral reasoning, value conflicts, normative debate     | Debate     | High weight on `explainability`, `neutrality` |

---

## Domain-Specific CADM Behaviors

While all domains map to the three canonical CADM modes, specific domains may exhibit unique behavioral patterns within those modes:

### Resolution Mode Domains

- **`law`**: Structured argumentation, precedent citation, rule-based reasoning
- **`finance`**: Quantitative analysis, risk assessment, compliance verification
- **`medicine`**: Evidence-based diagnosis, treatment protocols, safety validation
- **`science`**: Empirical verification, hypothesis testing, peer review
- **`news`**: Fact-checking, source verification, objective reporting
- **`cooking`**: Recipe accuracy, measurement precision, safety protocols
- **`home-automation`**: Command execution, system status, error resolution

### Synthesis Mode Domains

- **`general`**: Adaptive responses, context blending, user preference integration
- **`education`**: Knowledge synthesis, learning path optimization, student adaptation
- **`governance`**: Stakeholder alignment, policy synthesis, consensus building
- **`commerce`**: Preference matching, recommendation synthesis, value proposition blending
- **`psychology`**: Behavioral insight integration, therapeutic approach synthesis
- **`arts`**: Creative synthesis, style blending, collaborative creation

### Debate Mode Domains

- **`negotiation`**: Position articulation, conflict resolution, compromise exploration
- **`ethics`**: Value conflict resolution, moral reasoning, normative debate

---

## Extension Guidelines

To propose a new domain tag, submit a DESTIN Improvement Proposal (DIP) containing:

- `slug`: the unique tag identifier
- `description`: clear, domain-scoped purpose
- `cadm_mode`: one of the three canonical modes (Resolution, Synthesis, Debate)
- `domain_behaviors`: specific interaction patterns within the canonical mode
- `scoring_overrides`: optional changes to trait weights or decay behavior

---

## Versioning

This table reflects the tag set for DESTIN Spec `v0.1`. Updates are batched with minor version changes (e.g., `v0.2`).

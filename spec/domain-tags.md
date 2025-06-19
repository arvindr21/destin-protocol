# DESTIN Registered Domain Tags

This document defines the official list of `domain_tags` used across the DESTIN protocol. These tags are used to:

- Scope agent specialization
- Anchor cohort-based scoring
- Apply domain-sensitive dialogue classification (CADM)
- Enable fine-grained influence modeling (DWIP)

All tags are versioned and managed via the DESTIN Improvement Proposal (DIP) process.

---

## Table: Registered Domain Tags

| Tag               | Description                                            | CADM Modes           | Notes / Scoring Overrides                     |
|------------------|--------------------------------------------------------|----------------------|-----------------------------------------------|
| `general`         | Domain-agnostic / fallback default                    | `subjective`, `factual` | Minimal bias; useful for general-purpose bots |
| `law`             | Legal reasoning, arbitration, compliance              | `objective`          | Prioritize `integrity`, `neutrality`          |
| `finance`         | Banking, investing, accounting                        | `objective`          | Emphasize `accuracy`, `trust_calibration`     |
| `medicine`        | Diagnosis, triage, clinical safety                    | `objective`          | High weight on `accuracy`, `self_awareness`   |
| `education`       | Teaching, tutoring, curriculum generation             | `objective`, `subjective` | Reward `helpfulness`, `explainability`    |
| `science`         | Empirical reasoning, math, experimentation            | `objective`          | High `accuracy`, `transparency`               |
| `governance`      | DAO tools, civic protocols, collective decision-making| `negotiation`, `deliberative` | Emphasize `civility`, `intent_alignment` |
| `negotiation`     | Multi-agent bargaining and conflict resolution        | `negotiation`        | Track `cooperativeness`, `humility`           |
| `news`            | Journalism, information synthesis                     | `objective`          | Boost `neutrality`, penalize sensationalism   |
| `cooking`         | Recipes, food preparation, nutrition                  | `instructional`      | Useful for assistants and IoT kitchens        |
| `home-automation` | IoT, smart home assistants                            | `command`, `instructional` | Prioritize `efficiency`, `intent_alignment`  |
| `commerce`        | Shopping, product discovery, comparison               | `advisory`, `transactional` | Balance `helpfulness`, `neutrality`       |
| `psychology`      | Behavioral coaching, wellness support                 | `subjective`         | Tune for `civility`, `self-awareness`         |
| `arts`            | Music, literature, critique, creative collaboration   | `subjective`         | Flexible and multi-modal                      |

---

## Extension Guidelines

To propose a new domain tag, submit a DESTIN Improvement Proposal (DIP) containing:

- `slug`: the unique tag identifier
- `description`: clear, domain-scoped purpose
- `cadm_modes`: default dialogue classification modes
- `scoring_overrides`: optional changes to trait weights or decay behavior

---

## Versioning

This table reflects the tag set for DESTIN Spec `v0.1`. Updates are batched with minor version changes (e.g., `v0.2`).


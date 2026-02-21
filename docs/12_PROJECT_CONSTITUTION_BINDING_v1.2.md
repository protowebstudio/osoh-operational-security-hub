# PROJECT CONSTITUTION BINDING
Version: v1.2
Status: Binding (TFM Edition)
Authority: Project Maintainer

------------------------------------------------------------------------

## 1. Purpose

This document formally binds the Operational Security & Observability Hub (OSOH) project to the internal governance standards located in:

/governance/

The objective is to ensure engineering discipline, security consistency, determinism integrity, and reproducible deployment throughout the MVP lifecycle.

------------------------------------------------------------------------

## 2. Scope

This binding applies to:

- All documentation under /docs
- All backend and frontend source code
- CI configuration
- Docker configuration
- Deployment artifacts
- Release attestations

Experimental branches not merged into main are excluded.

------------------------------------------------------------------------

## 3. Adopted Governance Standards

The project adopts the following internal standards:

- UNIVERSAL_STRUCTURAL_EXPRESSION_STANDARD_v1.1
- UNIVERSAL_ENGINEERING_QUALITY_FRAMEWORK_v1.0
- UNIVERSAL_GOVERNANCE_MODEL_v1.0
- UNIVERSAL_AUDIT_PROTOCOL_v1.0
- UNIVERSAL_EVIDENCE_SCHEMA_v1.0
- UNIVERSAL_RELEASE_COMPLIANCE_STANDARD_v1.0

Additionally, the project is governed by:

- MVP_DEFINITION_AND_CONTROL_v1.0
- MVP_HARDENING_ADDENDUM_v1.0

These documents guide structure, security, and quality but do not expand MVP scope.

------------------------------------------------------------------------

## 4. Non-Weakening Rule

Project-level artifacts SHALL NOT:

- Weaken mandatory constraints defined in governance standards.
- Introduce conflicting security logic.
- Bypass CI enforcement.
- Override documented lifecycle controls.
- Remove deterministic guarantees.
- Remove ingestion rate limiting.
- Disable security event logging.

------------------------------------------------------------------------

## 5. Practical Inheritance

The governance standards influence:

- Branch discipline
- CI gating
- Documentation structure
- Deterministic risk computation
- Automatic risk recomputation after ingestion
- SHA256 token enforcement
- Rate limiting of ingestion endpoints
- Security event logging
- Deployment reproducibility

The project implements these in a practical, MVP-aligned manner.

------------------------------------------------------------------------

## 6. Conflict Resolution

If conflict exists between:

- A governance guideline
- A project implementation constraint

The stricter security or determinism rule SHALL prevail,
provided it remains within MVP scope.

Scope expansion is not permitted under conflict resolution.

------------------------------------------------------------------------

## 7. Evolution Policy

If governance standards are updated:

1. Impact analysis SHALL be performed.
2. Relevant documentation SHALL be updated.
3. CI validation SHALL be re-run.
4. Release attestation SHALL reflect changes.
5. Determinism and security invariants SHALL be revalidated.

No silent downgrade of engineering standards is permitted.

------------------------------------------------------------------------

## 8. Hierarchical Structure

Internal Governance Standards (/governance)
        ↓
Project Constitution Binding
        ↓
Project Architecture & Documentation (/docs)
        ↓
Implementation Layer (/src)
        ↓
Release Attestation

------------------------------------------------------------------------

END OF DOCUMENT

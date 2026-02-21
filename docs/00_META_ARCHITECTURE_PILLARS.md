# META ARCHITECTURE — ENGINEERING PILLARS
Version: v1.4.0
Status: Binding (TFM Edition)
Authority: Project Maintainer

------------------------------------------------------------------------

## 1. Purpose

This document defines the engineering principles governing the development of the Operational Security & Observability Hub (OSOH) MVP.

It establishes practical controls for governance, security, determinism, lifecycle discipline, and auditability.

This is an engineering control document, not a theoretical framework.

------------------------------------------------------------------------

## 2. Normative Language

MUST / SHALL → Mandatory requirement  
SHOULD → Strong recommendation  
MAY → Optional  

Project-level artifacts SHALL NOT weaken MUST-level requirements defined here.

------------------------------------------------------------------------

## 3. Pillar I — Governance

### Invariants

G-I1: All structural changes MUST be version-controlled.  
G-I2: Releases SHALL be tagged.  
G-I3: Architectural decisions MUST be documented via ADR when non-trivial.  
G-I4: Branch protection SHALL prevent direct commits to main.  

### Enforcement

- Git-based version control
- Pull Request review
- CI gate enforcement
- ADR registry

------------------------------------------------------------------------

## 4. Pillar II — Security

### Invariants

S-I1: No secrets SHALL exist in source control.  
S-I2: Authentication MUST be enforced for protected routes.  
S-I3: Authorization SHALL follow least privilege.  
S-I4: Input validation MUST be applied to all external inputs.  
S-I5: Ingestion tokens MUST be stored as SHA256 hashes.  
S-I6: Invalid ingestion attempts MUST be logged.  
S-I7: Ingestion endpoint SHALL be rate-limited.

### Enforcement

- Laravel Sanctum authentication
- SHA256 hashed ingestion tokens
- Constant-time token validation
- SecurityEvent logging
- throttle:60,1 rate limiting
- Environment variable isolation

------------------------------------------------------------------------

## 5. Pillar III — Deterministic Integrity

### Invariants

D-I1: Builds MUST be reproducible via Docker.  
D-I2: Dependency versions SHALL be pinned.  
D-I3: Risk scoring MUST be deterministic.  
D-I4: Risk recomputation SHALL occur immediately after ingestion.  
D-I5: Risk score MUST remain bounded (0–100).  
D-I6: Threshold classification SHALL follow fixed logic.

### Enforcement

- Docker Compose
- CI validation
- Version tagging
- Deterministic RiskService
- Automatic recompute inside ingestion pipeline

------------------------------------------------------------------------

## 6. Pillar IV — Lifecycle Discipline

### Invariants

L-I1: No deployment without passing tests.  
L-I2: CI MUST pass before merge.  
L-I3: Lifecycle transitions SHALL be documented.  
L-I4: MVP hardening SHALL NOT introduce scope expansion.

Minimum test coverage target: ≥ 70%.

### Enforcement

- GitHub Actions CI
- Branch protection
- Execution Plan adherence
- Hardening addendum alignment

------------------------------------------------------------------------

## 7. Pillar V — Evidence & Auditability

### Invariants

E-I1: Security-relevant events MUST be logged.  
E-I2: Risk recalculations MUST produce timestamped records.  
E-I3: Deployment validation MUST be reproducible.  
E-I4: Snapshot records SHALL reflect deterministic state.

### Enforcement

- TelemetryEvent records
- RiskSnapshot records
- SecurityEvent records
- Health endpoint verification
- Release attestation

------------------------------------------------------------------------

## 8. Compliance Condition

A release is considered valid when:

- CI passes
- Docker build succeeds
- Deployment validated via health endpoint
- Documentation updated
- Risk engine behaves deterministically
- Hardening invariants satisfied

------------------------------------------------------------------------

## 9. Structural Limitation

This document:

- Does not introduce distributed governance layers
- Does not mandate external audit frameworks
- Does not impose enterprise compliance automation
- Does not expand beyond MVP scope
- Does not introduce AI-based scoring

------------------------------------------------------------------------

END OF DOCUMENT

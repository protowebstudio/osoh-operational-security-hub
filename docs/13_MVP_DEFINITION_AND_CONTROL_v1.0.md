# MVP_DEFINITION_AND_CONTROL_v1.0

Version: v1.0  
Status: Binding (TFM Edition)  
Authority: Project Maintainer  
Scope: Operational Security & Observability Hub (OSOH) MVP  

------------------------------------------------------------------------

## 1. Purpose

This document formally defines the Minimum Viable Product (MVP) for the Operational Security & Observability Hub (OSOH).

It establishes:

- Exact functional scope
- Acceptance criteria
- Security baseline
- Determinism guarantees
- Reproducibility guarantees
- Release gate conditions
- Non-expansion rule

This document is binding for the MVP lifecycle.

------------------------------------------------------------------------

## 2. MVP Scope Freeze

The MVP SHALL include only the following capabilities:

### 2.1 Authentication
- Laravel Sanctum-based authentication
- Login endpoint
- Logout endpoint
- Protected routes requiring Bearer token

### 2.2 Site Management
- Create site
- List sites
- View site
- Delete site
- Rotate ingestion token (SHA256 hashed)

### 2.3 Telemetry Ingestion
- POST /api/ingest
- X-SITE-TOKEN header required
- SHA256 hashed token comparison
- Constant-time validation (hash_equals)
- Severity validation
- Timestamp validation
- Event persistence

### 2.4 Risk Engine
- Window-based aggregation
- Fixed severity-to-weight mapping
- Bounded risk score (0–100)
- Threshold-based classification
- Risk snapshot persistence
- GET /api/sites/{id}/risk endpoint

### 2.5 Dashboard
- Login view
- Site selection
- Risk score display
- Risk level display
- Basic chart visualization

### 2.6 Deployment
- Docker Compose stack
- PostgreSQL database
- Reproducible containerized execution
- /api/health endpoint operational
- Cloud deployment validated (Render or Railway)

No feature beyond this list SHALL be implemented.

------------------------------------------------------------------------

## 3. Non-Expansion Rule

During MVP phase:

- No AI-based logic SHALL be introduced.
- No multi-tenant architecture SHALL be introduced.
- No microservices SHALL be introduced.
- No distributed infrastructure SHALL be introduced.
- No external integrations SHALL be introduced.
- No compliance automation SHALL be introduced.

Scope freeze SHALL be respected.

------------------------------------------------------------------------

## 4. MVP Acceptance Criteria

The MVP SHALL be considered complete only when:

AC-1: User can authenticate successfully.  
AC-2: Protected routes reject unauthorized access (401).  
AC-3: Site token is stored hashed (SHA256).  
AC-4: Ingestion endpoint rejects invalid token.  
AC-5: TelemetryEvent record created on valid ingestion.  
AC-6: Risk score calculation is deterministic.  
AC-7: Risk score bounded between 0 and 100.  
AC-8: Threshold escalation functions correctly.  
AC-9: RiskSnapshot persisted.  
AC-10: Dashboard displays live risk data.  
AC-11: Docker Compose boots full stack successfully.  
AC-12: /api/health returns 200 OK.  
AC-13: CI pipeline passes.  
AC-14: Test coverage ≥ 70%.  
AC-15: No plaintext secrets exist in repository.

All acceptance criteria MUST be satisfied.

------------------------------------------------------------------------

## 5. Security Baseline

The MVP MUST satisfy:

- Sanctum middleware on protected routes
- Constant-time token comparison
- Rate limiting on ingestion endpoint
- Input validation via Laravel Form Requests
- No debug data in production
- .env excluded from version control
- HTTPS required in production

Security SHALL remain bounded to MVP scope.

------------------------------------------------------------------------

## 6. Determinism Guarantee

The system SHALL guarantee:

- Identical risk score for identical event window
- Fixed severity-to-weight mapping
- No stochastic behavior
- No probabilistic scoring
- No AI inference
- No runtime configuration mutation

Determinism is a mandatory property.

------------------------------------------------------------------------

## 7. Reproducibility Guarantee

The system SHALL guarantee:

- Containerized deployment
- Version-pinned dependencies
- No hidden runtime dependencies
- Identical behavior across environments
- Rebuildable from source at any time

Docker Compose SHALL reproduce full system state.

------------------------------------------------------------------------

## 8. Release Gate Conditions

A release SHALL be permitted only when:

- CI pipeline passes
- Test coverage ≥ 70%
- Docker build succeeds
- Migrations execute successfully
- /api/health returns OK
- QA Attestation updated
- Version tag applied

Failure of any gate SHALL block release.

------------------------------------------------------------------------

## 9. Change Control

Any modification affecting:

- Authentication logic
- Risk engine logic
- Security boundary
- Deployment model
- CI configuration

SHALL require:

- ADR entry
- Impact analysis
- Revalidation of acceptance criteria
- Updated QA attestation

Silent scope drift is prohibited.

------------------------------------------------------------------------

## 10. Completion Definition

The MVP is complete when:

- All acceptance criteria satisfied
- Deployment reproducible
- Security baseline enforced
- Determinism validated
- Release tagged
- Demo stable under repeated execution

At that point, MVP transitions from Implementation Phase to Stabilization Phase.

------------------------------------------------------------------------

END OF DOCUMENT

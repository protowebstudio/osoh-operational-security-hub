# FRONTEND_ARCHITECTURE_CONSTITUTION
Version: v1.0
Status: Binding
Namespace: FRONTEND

------------------------------------------------------------------------

## 1. Purpose

This document defines the architectural principles governing the O.S.O.H. frontend system.

The frontend SHALL:

- Match backend maturity level
- Preserve architectural separation
- Enforce deterministic behavior
- Avoid scope expansion
- Remain container-isolated
- Remain production-buildable

This is not a demo UI layer.
It is a structured application boundary.

------------------------------------------------------------------------

## 2. Architectural Model

System Topology:

Docker Compose
 ├── backend (Laravel API)
 ├── db (PostgreSQL)
 └── frontend (React + TypeScript + Vite)

Frontend communicates exclusively via HTTP API.

No shared runtime.
No server-side coupling.
No implicit integration.

------------------------------------------------------------------------

## 3. Structural Principles

F-I1: Strict TypeScript mode SHALL be enabled.
F-I2: No direct fetch calls inside UI components.
F-I3: All API calls SHALL be encapsulated in service layer.
F-I4: Components SHALL be presentation-only.
F-I5: Domain logic SHALL reside in modules.
F-I6: DTO models SHALL be explicitly typed.
F-I7: Environment configuration SHALL be externalized.
F-I8: Frontend SHALL be Dockerized.
F-I9: Production build SHALL succeed deterministically.
F-I10: Scope SHALL remain bounded to MVP functionality.

------------------------------------------------------------------------

## 4. Folder Structure

Target layout:

frontend/
 ├── src/
 │   ├── app/
 │   ├── pages/
 │   ├── components/
 │   ├── modules/
 │   ├── services/
 │   ├── models/
 │   ├── hooks/
 │   ├── router/
 │   ├── config/
 │   └── utils/
 ├── Dockerfile
 ├── vite.config.ts
 ├── tsconfig.json
 └── package.json

Flat /docs structure retained.

------------------------------------------------------------------------

## 5. API Abstraction Contract

Frontend SHALL communicate through typed service layer.

Example:

SiteService.getAll()
RiskService.getSnapshot(siteId)

No component-level HTTP logic permitted.

------------------------------------------------------------------------

## 6. Authentication Handling

- Bearer token stored securely
- Automatic header injection
- Explicit logout flow
- 401 handling via redirect
- No implicit auth side effects

------------------------------------------------------------------------

## 7. Risk Dashboard Requirements

UI MUST display:

- Current risk score
- Risk level classification
- Event count
- Window size
- Timestamp
- Threshold indicators

Visualization SHALL remain deterministic and data-driven.

------------------------------------------------------------------------

## 8. Non-Expansion Rule

Frontend SHALL NOT introduce:

- AI visualization logic
- Real-time websockets
- Multi-tenant logic
- Micro-frontend architecture
- External UI frameworks beyond minimal necessity

Scope remains MVP-bound.

------------------------------------------------------------------------

## 9. Hardening Alignment

Frontend SHALL respect:

- Ingestion rate limiting
- Security boundary enforcement
- Deterministic recompute model
- Governance layer binding
- Reproducible Docker deployment

------------------------------------------------------------------------

## 10. Completion Criteria

Frontend architecture is considered valid when:

- Strict TypeScript passes
- Production build succeeds
- Docker container runs
- Auth flow works
- Site management works
- Risk dashboard renders correctly
- No architectural invariant violated

------------------------------------------------------------------------

END OF DOCUMENT

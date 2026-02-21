# Operational Security & Observability Hub (OSOH)

---

## 1. Executive Summary

Operational Security & Observability Hub (OSOH) is a production-ready deterministic MVP designed to ingest telemetry events, compute a bounded risk score, and provide real-time operational visibility.

The system is secure, reproducible, and hardened within strict MVP scope boundaries.

---

## 2. Problem Statement

Engineering teams require a lightweight, deterministic, and structured mechanism to:

- Ingest security-relevant events
- Quantify operational risk without probabilistic logic
- Escalate risk thresholds consistently
- Maintain reproducible deployments

Most solutions are either overly complex or insufficiently structured.

---

## 3. Solution Overview

OSOH provides:

- Secure authentication via Laravel Sanctum
- Site-based telemetry ingestion using SHA256 hashed tokens
- Constant-time token validation
- Automatic deterministic risk recomputation
- Bounded risk scoring (0–100)
- Snapshot persistence
- Security event logging
- Rate-limited ingestion endpoint
- Docker-based reproducible deployment

System scope remains intentionally bounded.

---

## 4. Architecture Overview

```

Client → Laravel API → Deterministic Risk Engine → PostgreSQL

```

Deployment Model:

```

Docker Compose
├── app (Laravel)
└── db (PostgreSQL)

```

Single deployment unit. No microservices.

---

## 5. Technology Stack

Backend:
- Laravel (PHP 8.2+)
- PostgreSQL
- Laravel Sanctum
- SHA256 token hashing
- Deterministic RiskService

Infrastructure:
- Docker Compose
- GitHub Actions CI
- Render / Railway compatible

---

## 6. Data Model Summary

User
- id
- name
- email

Site
- id
- name
- hashed_token (SHA256)
- risk_threshold_high
- risk_threshold_critical
- risk_window_size

TelemetryEvent
- id
- site_id
- severity
- event_timestamp
- message

RiskSnapshot
- site_id
- score (0–100)
- level
- computed_at

SecurityEvent
- site_id (nullable)
- event_type
- description
- occurred_at

---

## 7. Deterministic Risk Engine

Risk Score:

```

Score = min(100, Σ severity_weight)

```

Severity Weights:

- Low = 10
- Medium = 25
- High = 50
- Critical = 75

Window Logic:
Last N events per site (risk_window_size).

Thresholds:
- ≥ risk_threshold_high → High
- ≥ risk_threshold_critical → Critical

Risk recomputes automatically after each ingestion.

No AI.
No probabilistic scoring.
Fully deterministic.

---

## 8. Security Model

Authentication:
- Laravel Sanctum

Telemetry Authentication:
- SHA256 hashed tokens
- Constant-time validation
- No plaintext token storage

Hardening:
- Automatic risk recompute
- Invalid token attempts logged in security_events
- Rate limiting (60 req/min)
- Strict input validation
- Environment-based secrets

---

## 9. API Overview

Authentication:
- POST /api/login
- POST /api/logout

Sites:
- GET /api/sites
- POST /api/sites
- GET /api/sites/{id}
- DELETE /api/sites/{id}
- POST /api/sites/{id}/rotate-token

Telemetry:
- POST /api/ingest (X-SITE-TOKEN header)

Risk:
- GET /api/sites/{id}/risk

Health:
- GET /up

---

## 10. Setup

```

docker compose up --build

```

Run migrations inside container:

```

docker exec -it osoh_app php artisan migrate

```

Stop:

```

docker compose down

```

---

## 11. Deployment

1. Build Docker image
2. Configure environment variables
3. Provision PostgreSQL
4. Run migrations
5. Validate /up endpoint

Reproducibility guaranteed by Docker.

---

## 12. Demo Scenario

1. Login
2. Create Site
3. Obtain ingestion token
4. Send telemetry event
5. Risk auto-recomputes
6. Snapshot persisted
7. Threshold escalation visible

Demonstrates:

- Secure ingestion boundary
- Deterministic scoring
- Automatic consistency
- Security logging
- Rate limiting

---

## 13. AI Usage Disclosure

AI tools assisted with scaffolding and documentation.

All architectural decisions, risk logic, and security boundaries were manually designed and validated.

No AI-based scoring is implemented.

---

## 14. Version

See VERSION file.

Current Status:
MVP+ Hardened (Deterministic & Secure)


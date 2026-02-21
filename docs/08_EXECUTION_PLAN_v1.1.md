# 4-Day Execution Plan

**Operational Security & Observability Hub (OSOH)**
Timeline: 19.02 → 23.02

---

## 1. Overview

### Delivery Objective

Deliver a fully working, deployable MVP that demonstrates:

* Secure authentication (Laravel Sanctum)
* Telemetry ingestion via hashed site tokens
* Deterministic risk engine (0–100 bounded score)
* Dashboard visualization
* Docker Compose deployment
* CI passing
* Clear documentation
* Stable demo scenario

No feature expansion beyond defined MVP.

---

### Definition of “MVP Complete”

MVP is complete when:

* Users can authenticate
* Sites can be created
* Telemetry events can be ingested
* Risk score updates deterministically
* Dashboard displays risk state and chart
* Docker Compose works locally
* App deployed to Render or Railway
* README finalized
* Demo runs without failure

---

# Day 1 — Backend Core (19.02)

## Objective: Secure backend foundation

### 1. Project Setup

* Initialize Laravel project
* Configure PostgreSQL connection
* Configure `.env`
* Install Laravel Sanctum

### 2. Database Migrations

Create tables:

* users
* sites
* telemetry_events
* risk_snapshots

Ensure:

* Foreign keys defined
* Indexes on site_id
* No unnecessary fields

### 3. Authentication

* Sanctum setup
* Login endpoint
* Logout endpoint
* Middleware protection

Test:

* Token issuance
* Protected route access

### 4. Site Model

* CRUD for sites (create, list, show, delete)
* Store hashed site token (SHA256)
* Token rotation endpoint

### 5. Telemetry Ingestion Endpoint

* POST /api/ingest
* Validate:

  * severity
  * timestamp
* Token header required
* Constant-time comparison (`hash_equals`)
* Store event

Deliverable End of Day 1:

* Auth works
* Site creation works
* Telemetry ingestion persists events
* Basic API tested via Postman

---

# Day 2 — Risk Engine + Frontend Base (20.02)

## Objective: Deterministic risk logic + UI skeleton

### 1. Risk Calculation Service

Create service class:

* Accept site_id
* Fetch last N events
* Map severity to weight
* Sum weights
* Cap at 100

Implement:

* Window logic
* Fallback when fewer than N events exist

### 2. Risk Endpoint

* GET /api/sites/{id}/risk
* Return:

  * score
  * level
  * window_size
  * event_count
  * computed_at

### 3. Scheduled Job

* Create Laravel scheduled task
* Recompute risk snapshot periodically
* Store in risk_snapshots table

Test:

* Snapshot updates correctly

---

### 4. React App Setup

* Vite + React
* Tailwind setup
* Basic folder structure

### 5. Login Page

* Simple form
* Store token
* Redirect to dashboard

### 6. Dashboard Layout

* Display:

  * Current risk score
  * Risk level
  * Chart area placeholder
  * Event count

Deliverable End of Day 2:

* Risk engine functional
* Risk endpoint working
* React app connects to backend
* Login + basic dashboard renders data

---

# Day 3 — Integration + Deployment (21.02)

## Objective: End-to-end stability

### 1. Frontend Integration

* Fetch sites
* Fetch risk data
* Display chart using Recharts
* Show dynamic risk level

### 2. Error Handling

* Global error handler in frontend
* API error format consistency
* Handle 401 redirect to login

### 3. Docker Compose Validation

* Backend container
* PostgreSQL container
* Frontend container
* Environment variables verified
* Run migrations automatically

Test:

* Full stack works via Docker only

### 4. Cloud Deployment

Deploy to:

* Render or Railway

Steps:

* Set environment variables
* Provision PostgreSQL
* Run migrations
* Verify `/api/health`

### 5. Fix CORS Issues

* Allow frontend origin
* Test login + ingest

Deliverable End of Day 3:

* Fully working deployed MVP
* Docker reproducible locally
* Cloud version functional

---

# Day 4 — Stabilization + Presentation Prep (22.02)

## Objective: Polish + Demo Stability

### 1. Bug Fixing

* Fix edge cases
* Validate risk window logic
* Confirm token rotation works
* Confirm thresholds work

### 2. Demo Scenario Rehearsal

Run full script:

1. Login
2. Create site
3. Ingest event
4. Show risk escalation
5. Show chart update
6. Show health endpoint

Practice multiple times.

### 3. Final README Review

* Confirm no contradictions
* Confirm setup steps accurate
* Confirm Docker instructions valid
* Confirm no aspirational features

### 4. Slide Outline

Prepare slides:

* Problem
* Architecture
* Risk engine logic
* Security model
* Demo
* Deployment
* Limitations

### 5. Risk Mitigation Plan

Prepare answers for:

* Why deterministic?
* Why no AI?
* Why single container?
* Why Sanctum?
* Why Docker Compose?

Deliverable End of Day 4:

* Stable demo
* Documentation finalized
* Slides prepared
* No runtime surprises

---

# 6. Risk Management

## What to Cut If Under Time Pressure

Priority order:

1. Chart customization (keep basic)
2. Scheduled job (compute risk on-demand)
3. Advanced UI styling
4. Token rotation (if needed)

Never cut:

* Authentication
* Ingestion security
* Risk calculation
* Docker deployment
* Cloud validation

---

## Common Pitfalls

* CORS misconfiguration
* Sanctum token storage issues
* Docker network misalignment
* Environment variable mismatch
* Risk window off-by-one logic

---

## Emergency Fallback Plan

If cloud deployment fails:

* Demonstrate Docker Compose locally
* Use recorded terminal output
* Show `/api/health`
* Show database state

Deployment must work in at least one environment.

---

# 7. Definition of DONE Checklist

* [ ] Login works
* [ ] Site creation works
* [ ] Ingestion endpoint secured
* [ ] Risk score bounded 0–100
* [ ] Threshold escalation visible
* [ ] Dashboard renders chart
* [ ] Docker Compose works
* [ ] Cloud deployment live
* [ ] README final
* [ ] CI passes
* [ ] Demo rehearsed 3+ times

---

End of Execution Plan.

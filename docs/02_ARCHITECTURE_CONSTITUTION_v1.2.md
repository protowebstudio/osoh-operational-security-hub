# ARCHITECTURE_CONSTITUTION
Version: v1.2
Status: Binding
Namespace: ARCH

------------------------------------------------------------------------

## 1. Architectural Model

Monolithic Laravel backend with deterministic risk engine.

Data Flow:

Client → API → Middleware → RiskService → PostgreSQL

------------------------------------------------------------------------

## 2. Core Layers

Controllers → Services → Models → Database

------------------------------------------------------------------------

## 3. Deterministic Risk Engine

- Fixed severity weights
- Window-based aggregation
- Bounded score (0–100)
- Threshold classification
- Automatic recompute on ingestion

------------------------------------------------------------------------

## 4. Hardening Controls

- Constant-time token comparison
- SHA256 token storage
- Rate limiting (60/min)
- Security event logging
- No async complexity

------------------------------------------------------------------------

END OF DOCUMENT

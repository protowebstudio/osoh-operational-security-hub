# API_CONTRACT_MODEL
Version: v1.1
Namespace: API

------------------------------------------------------------------------

## Deterministic Risk Behavior

Score = min(100, Σ severity_weight)

Severity Weights:
- Low = 10
- Medium = 25
- High = 50
- Critical = 75

Risk recomputes automatically after ingestion.

------------------------------------------------------------------------

## Ingestion Endpoint

POST /api/ingest
Headers:
- X-SITE-TOKEN
- Accept: application/json

Rate limited (60/min)

Invalid token:
- 401 response
- SecurityEvent logged

------------------------------------------------------------------------

END OF DOCUMENT

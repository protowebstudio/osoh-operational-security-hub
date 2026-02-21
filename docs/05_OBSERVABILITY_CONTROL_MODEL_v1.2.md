# OBSERVABILITY_CONTROL_MODEL
Version: v1.2
Namespace: OBS

------------------------------------------------------------------------

## Telemetry

Valid ingestion MUST persist TelemetryEvent.

------------------------------------------------------------------------

## Risk Snapshot

Each recompute MUST persist RiskSnapshot.

Automatic recompute triggered after ingestion.

------------------------------------------------------------------------

## Security Events

Invalid token attempts MUST generate SecurityEvent record.

------------------------------------------------------------------------

## Health Endpoint

GET /api/health

Returns:

{
  "status": "ok",
  "timestamp": "<iso8601>"
}

This endpoint SHALL be used for:

- Deployment validation
- CI health verification
- Smoke testing
- Deterministic runtime checks

------------------------------------------------------------------------

END OF DOCUMENT

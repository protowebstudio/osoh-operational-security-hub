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

GET /up
Returns:
{ "status": "ok" }

------------------------------------------------------------------------

END OF DOCUMENT

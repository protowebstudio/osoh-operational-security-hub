# SECURITY_BOUNDARY_MODEL
Version: v1.2
Status: Binding
Namespace: SEC

------------------------------------------------------------------------

## Authentication

- Sanctum enforced on protected routes
- Bearer token required
- Logout invalidates token

------------------------------------------------------------------------

## Ingestion Boundary

- X-SITE-TOKEN header required
- SHA256 hashed tokens
- Constant-time comparison
- Invalid attempts logged
- Rate limiting active

------------------------------------------------------------------------

## Invariants

- No plaintext tokens stored
- 401 on invalid authentication
- SecurityEvent persisted for invalid token
- Input validation enforced

------------------------------------------------------------------------

END OF DOCUMENT

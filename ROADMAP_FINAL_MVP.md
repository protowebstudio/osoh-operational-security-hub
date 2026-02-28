# ROADMAP FINAL — MVP (Observed Evidence Only)

Date (UTC): 2026-02-28

This file is the MVP completion ledger for OSOH (Operational Security & Observability Hub).
All statements below are "Observed Evidence Only" and must be backed by runnable commands and/or URLs.
No unstated assumptions. Fail-closed.

---

## System Topology

- API Execution Core (Laravel + Sanctum) at: https://api.protowebstudio.com
- WWW Product Surface (Vite SPA) at: https://protowebstudio.com
- Sentinel institutional demo: (tracked separately; not asserted here unless proven)

---

## MVP Definition

MVP means:
1) API is live and returns health.
2) WWW is live and points to the live API (not localhost).
3) Core workflow exists: register/login → create site → ingest event (token) → risk snapshot computed/readable.
4) Tests pass (Feature suite).

---

## Observed Evidence

### E1 — API Live Health (PASS)

Command:
- `curl -i https://api.protowebstudio.com/api/health`

Expected:
- HTTP 200
- JSON body includes `status: "ok"` and a UTC `timestamp`

Status:
- PASS (observed on 2026-02-28)

---

### E2 — WWW Live Shell (PASS)

Commands:
- `curl -i https://protowebstudio.com/ | sed -n '1,60p'`
- `curl -i https://protowebstudio.com/dashboard | sed -n '1,80p'`

Expected:
- HTTP 200
- HTML shell is served for SPA routes

Status:
- PASS (observed on 2026-02-28)

---

### E3 — WWW Build Configured to Live API (PASS)

Build command (explicit prod base):
- `cd frontend && VITE_API_BASE_URL="https://api.protowebstudio.com" npm run build`

Verification command (bundle contains live base):
- `grep -RIn "API_BASE_URL" frontend/dist/assets | sed -n '1,80p'`

Expected:
- bundle contains `API_BASE_URL:"https://api.protowebstudio.com"`
- bundle does NOT contain `http://localhost:8000`

Status:
- PASS (observed on 2026-02-28)

---

### E4 — WWW Deploy Root Updated (PASS)

Nginx root (reference):
- `/etc/nginx/sites-available/protowebstudio.conf`
- root path should be:
  `/home/NStK2HQLhGESkfl2/api-protowebstudio/public_html/frontend/dist`

Deploy procedure (atomic swap):
- backup current dist
- copy new dist to dist.new
- swap dist.new -> dist
- verify deployed dist contains live API base

Verification command (deployed root contains live base):
- `grep -RIn "API_BASE_URL" /home/NStK2HQLhGESkfl2/api-protowebstudio/public_html/frontend/dist/assets | sed -n '1,80p'`

Status:
- PASS (observed on 2026-02-28)

---

### E5 — Backend Feature Tests (PASS)

Commands:
- `cd src/backend`
- `php artisan test --testsuite=Feature`

Notes:
- Required installing SQLite driver on host to satisfy test DB driver:
  `apt-get install -y php8.3-sqlite3`

Expected:
- Feature suite passes

Status:
- PASS (observed on 2026-02-28)

---

## Known Gaps / Not Yet Proven

These are explicitly not claimed as MVP-complete until proven with new evidence:

- End-to-end “Create Site → Ingest → Risk Snapshot visible in WWW” performed against production.
- Tag-based “freeze” or release anchors (no git tags present on origin at time of check).
- Sentinel deploy status and its live proof surfaces.

---

## Next Proofs (recommended)

1) Production E2E (API-only) via curl:
- register/login → token
- create site → site token
- ingest event with X-SITE-TOKEN
- fetch risk

2) WWW E2E (manual in browser) verifying dashboard calls live API and displays snapshots.


---

### E6 — Production API E2E (PASS)

Command (sanitized script):
- register -> token (redacted)
- create site -> site token (redacted)
- ingest -> event_id
- fetch risk -> snapshot JSON
- logout -> http 200

Observed:
- PASS (observed on 2026-02-28 UTC)
- Evidence: terminal capture shows event_id + snapshot fields (score/level/event_count/window_size/computed_at) and logout_http_status=200

---

### E7 — WWW Deployed Bundle Uses Live API Base (PASS)

Commands:
- Detect bundle path:
  `curl -sS https://protowebstudio.com/ | grep -Eo "assets/index-[A-Za-z0-9_-]+\.js" | head -n 1`
- Verify bundle contains live base:
  `curl -sS "https://protowebstudio.com/$JS_PATH" | grep -F "API_BASE_URL" | head -n 5`
- Verify bundle contains no localhost:
  `curl -sS "https://protowebstudio.com/$JS_PATH" | grep -E "localhost:8000|127\.0\.0\.1:8000" | head -n 5 || true`

Observed:
- PASS (observed on 2026-02-28 UTC)

# Phase 11.6 — Deploy Procedure Codification

## Backend deploy / promote
1. Prepare or verify target release directory under:
   `/home/NStK2HQLhGESkfl2/api-protowebstudio/releases/<release_name>`
2. Verify release contents exist:
   - `src/backend/artisan`
   - `src/backend/config/cors.php`
   - application code present
3. Point live backend to target release:
   `sudo ln -sfn /home/NStK2HQLhGESkfl2/api-protowebstudio/releases/<release_name> /home/NStK2HQLhGESkfl2/api-protowebstudio/current`
4. Refresh backend runtime:
   `cd /home/NStK2HQLhGESkfl2/api-protowebstudio/current/src/backend`
   `sudo php artisan optimize:clear`
   `sudo php artisan config:cache`

## Frontend deploy / publish
1. Build frontend from:
   `/home/NStK2HQLhGESkfl2/api-protowebstudio/public_html/frontend`
2. Verify `.env.production` points to:
   `VITE_API_BASE_URL=https://api.protowebstudio.com`
3. Run:
   `npm ci`
   `npm run scan:forbidden`
   `npm run assert:env:prod`
   `npm run build`
4. Publish by replacing live contents under:
   `/home/NStK2HQLhGESkfl2/api-protowebstudio/public_html/frontend/dist`

## Post-deploy validation
1. `curl -I https://protowebstudio.com`
2. `curl -I https://protowebstudio.com/dashboard`
3. `curl -I https://api.protowebstudio.com/api/health`
4. Verify live bundle contains production API target:
   `curl -s https://protowebstudio.com/assets/<live_bundle>.js | grep -Eo 'https://api\.protowebstudio\.com|/api/' | head`

## Rollback trigger
Rollback immediately if any of the following occur:
- site root not `200`
- dashboard not `200`
- API health not `200`
- CORS returns localhost origin
- live bundle targets localhost or wrong API origin

## Backend rollback
1. Repoint `current` to prior known-good release
2. Run:
   `sudo php artisan optimize:clear`
   `sudo php artisan config:cache`
3. Re-run smoke checks

## Frontend rollback
1. Restore previous known-good `dist`
2. Re-run smoke checks

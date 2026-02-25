<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Postgres-safe, idempotent, CI-safe
        DB::statement("ALTER TABLE telemetry_events ADD COLUMN IF NOT EXISTS event_id uuid");
        DB::statement("ALTER TABLE telemetry_events ALTER COLUMN event_id SET DEFAULT gen_random_uuid()");
        DB::statement("UPDATE telemetry_events SET event_id = gen_random_uuid() WHERE event_id IS NULL");
        DB::statement("ALTER TABLE telemetry_events ALTER COLUMN event_id SET NOT NULL");
        DB::statement("CREATE UNIQUE INDEX IF NOT EXISTS telemetry_events_event_id_unique ON telemetry_events(event_id)");
    }

    public function down(): void
    {
        DB::statement("DROP INDEX IF EXISTS telemetry_events_event_id_unique");
        DB::statement("ALTER TABLE telemetry_events DROP COLUMN IF EXISTS event_id");
    }
};
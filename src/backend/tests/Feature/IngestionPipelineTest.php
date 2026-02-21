<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Site;
use App\Models\TelemetryEvent;
use App\Models\RiskSnapshot;
use App\Models\SecurityEvent;

class IngestionPipelineTest extends TestCase
{
    use RefreshDatabase;

    public function test_valid_ingestion_triggers_recompute_and_snapshot()
    {
        $plainToken = 'valid-token';

        $site = Site::factory()->create([
            'hashed_token' => hash('sha256', $plainToken),
        ]);

        $response = $this->postJson('/api/ingest', [
            'severity' => 'High',
            'event_timestamp' => now()->toISOString(),
            'message' => 'CPU spike'
        ], [
            'X-SITE-TOKEN' => $plainToken
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('telemetry_events', [
            'site_id' => $site->id
        ]);

        $snapshot = RiskSnapshot::where('site_id', $site->id)->first();

        $this->assertNotNull($snapshot);
        $this->assertLessThanOrEqual(100, $snapshot->score);
    }

    public function test_invalid_token_creates_security_event()
    {
        $response = $this->postJson('/api/ingest', [
            'severity' => 'High',
            'event_timestamp' => now()->toISOString(),
        ], [
            'X-SITE-TOKEN' => 'invalid-token'
        ]);

        $response->assertStatus(401);

        $this->assertDatabaseHas('security_events', [
            'event_type' => 'invalid_token'
        ]);
    }

    public function test_rate_limit_enforced()
    {
        $plainToken = 'rate-token';

        $site = Site::factory()->create([
            'hashed_token' => hash('sha256', $plainToken),
        ]);

        for ($i = 0; $i < 60; $i++) {
            $this->postJson('/api/ingest', [
                'severity' => 'Low',
                'event_timestamp' => now()->toISOString(),
            ], [
                'X-SITE-TOKEN' => $plainToken
            ]);
        }

        $response = $this->postJson('/api/ingest', [
            'severity' => 'Low',
            'event_timestamp' => now()->toISOString(),
        ], [
            'X-SITE-TOKEN' => $plainToken
        ]);

        $response->assertStatus(429);
    }
}
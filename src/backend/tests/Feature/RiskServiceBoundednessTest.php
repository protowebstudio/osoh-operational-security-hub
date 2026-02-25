<?php

namespace Tests\Feature;

use App\Models\Site;
use App\Models\TelemetryEvent;
use App\Services\RiskService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class RiskServiceBoundednessTest extends TestCase
{
    use RefreshDatabase;

    public function test_risk_score_is_always_bounded_between_0_and_100(): void
    {
        // Seed PHP's non-crypto RNG so mt_rand() + array_rand() are reproducible.
        mt_srand(1337);

        $site = Site::factory()->create([
            'risk_window_size' => 50,
            'risk_threshold_high' => 50,
            'risk_threshold_critical' => 80,
        ]);

        $service = app(RiskService::class);
        $severities = ['Low', 'Medium', 'High', 'Critical'];

        for ($trial = 0; $trial < 50; $trial++) {
            TelemetryEvent::where('site_id', $site->id)->delete();

            // Use mt_rand (seeded) instead of random_int (not affected by mt_srand).
            $n = mt_rand(0, 200);

            for ($i = 0; $i < $n; $i++) {
                TelemetryEvent::create([
                    'event_id' => (string) Str::uuid(),
                    'site_id' => $site->id,
                    'severity' => $severities[array_rand($severities)],
                    'event_timestamp' => now()->subSeconds($i),
                    'message' => 'boundedness-test',
                ]);
            }

            $snapshot = $service->compute($site);

            $this->assertNotNull($snapshot);
            $this->assertGreaterThanOrEqual(0, $snapshot->score);
            $this->assertLessThanOrEqual(100, $snapshot->score);
        }
    }
}
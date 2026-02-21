<?php

namespace Tests\Feature;

use App\Models\Site;
use App\Models\TelemetryEvent;
use App\Services\RiskService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RiskServiceBoundednessTest extends TestCase
{
    use RefreshDatabase;

    public function test_risk_score_is_always_bounded_between_0_and_100(): void
    {
        $site = Site::factory()->create([
            'risk_window_size' => 50,
            'risk_threshold_high' => 50,
            'risk_threshold_critical' => 80,
        ]);

        $service = app(RiskService::class);

        $severities = ['Low', 'Medium', 'High', 'Critical'];

        for ($trial = 0; $trial < 200; $trial++) {
            TelemetryEvent::where('site_id', $site->id)->delete();

            $n = random_int(0, 200);

            for ($i = 0; $i < $n; $i++) {
                TelemetryEvent::create([
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
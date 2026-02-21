<?php

namespace App\Services;

use App\Models\Site;
use App\Models\TelemetryEvent;
use App\Models\RiskSnapshot;

class RiskService
{
    protected array $severityWeights = [
        'Low' => 10,
        'Medium' => 25,
        'High' => 50,
        'Critical' => 75,
    ];

    public function compute(Site $site): RiskSnapshot
    {
        $events = TelemetryEvent::where('site_id', $site->id)
            ->orderByDesc('event_timestamp')
            ->limit($site->risk_window_size)
            ->get();

        $score = 0;

        foreach ($events as $event) {
            $score += $this->severityWeights[$event->severity] ?? 0;
        }

        // Bound score 0–100
        $score = min(100, $score);

        $level = $this->determineLevel($score, $site);

        return RiskSnapshot::create([
            'site_id' => $site->id,
            'score' => $score,
            'level' => $level,
            'event_count' => $events->count(),
            'window_size' => $site->risk_window_size,
            'computed_at' => now(),
        ]);
    }

    protected function determineLevel(int $score, Site $site): string
    {
        if ($score >= $site->risk_threshold_critical) {
            return 'Critical';
        }

        if ($score >= $site->risk_threshold_high) {
            return 'High';
        }

        if ($score > 0) {
            return 'Medium';
        }

        return 'Low';
    }
}
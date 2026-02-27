<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\TelemetryEvent;
use App\Services\RiskService;

class IngestionController extends Controller
{
    public function ingest(Request $request)
    {
        $site = $request->attributes->get('site');

        $validated = $request->validate([
            'severity' => ['required', 'in:Low,Medium,High,Critical'],
            'event_timestamp' => ['required', 'date'],
            'message' => ['nullable', 'string'],
        ]);

        $event = TelemetryEvent::create([
            'event_id' => (string) Str::uuid(),
            'site_id' => $site->id,
            'severity' => $validated['severity'],
            'event_timestamp' => $validated['event_timestamp'],
            'message' => $validated['message'] ?? null,
        ]);
        $event->refresh();

        // Deterministic synchronous recompute
        $riskService = new RiskService();
        $riskService->compute($site);

        return response()->json([
            'message' => 'Event ingested',
            'event_id' => $event->event_id,
        ], 201);
    }
}
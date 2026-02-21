<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TelemetryEvent;
use App\Models\SecurityEvent;

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
            'site_id' => $site->id,
            'severity' => $validated['severity'],
            'event_timestamp' => $validated['event_timestamp'],
            'message' => $validated['message'] ?? null,
        ]);

        return response()->json([
            'message' => 'Event ingested',
            'event_id' => $event->id,
        ], 201);
    }
}
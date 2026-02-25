<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class SiteController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            $request->user()->sites()->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'risk_threshold_high' => ['required', 'integer', 'min:0', 'max:100'],
            'risk_threshold_critical' => ['required', 'integer', 'min:0', 'max:100'],
            'risk_window_size' => ['required', 'integer', 'min:1', 'max:1000'],
        ]);

        $plainToken = Str::random(64);

        $site = Site::create([
            'name' => $validated['name'],
            'risk_threshold_high' => $validated['risk_threshold_high'],
            'risk_threshold_critical' => $validated['risk_threshold_critical'],
            'risk_window_size' => $validated['risk_window_size'],
            'hashed_token' => hash('sha256', $plainToken),
            'user_id' => $request->user()->id,
            'slug' => Str::slug($validated['name']),
        ]);

        return response()->json([
            'id' => $site->id,
            'token' => $plainToken,
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $site = $request->user()->sites()->findOrFail($id);
        return response()->json($site);
    }

    public function destroy(Request $request, $id)
    {
        $site = $request->user()->sites()->findOrFail($id);
        $site->delete();
        return response()->json(null, 204);
    }

    public function rotateToken(Request $request, $id)
    {
        $site = $request->user()->sites()->findOrFail($id);

        $plainToken = Str::random(64);

        $site->update([
            'hashed_token' => hash('sha256', $plainToken),
        ]);

        return response()->json([
            'token' => $plainToken,
        ]);
    }

    public function risk(Request $request, $id)
    {
        $site = $request->user()->sites()->findOrFail($id);
        $riskService = new \App\Services\RiskService();
        $snapshot = $riskService->compute($site);

        return response()->json($snapshot);
    }

    /**
     * Public read-only risk endpoint (no auth).
     */
    public function publicRisk(Request $request, string $slug)
    {
        Log::info('public-risk access attempt', [
            'slug' => $slug,
            'ip' => $request->ip(),
            'timestamp' => now()->toIso8601String(),
        ]);

        $site = Site::where('slug', $slug)
            ->where('is_public', true)
            ->first();

        if (!$site) {
            Log::warning('public-risk invalid slug or not public', [
                'slug' => $slug,
                'ip' => $request->ip(),
            ]);

            abort(404);
        }

        $snapshot = $site->riskSnapshots()
            ->latest('computed_at')
            ->first();

        if (!$snapshot) {
            Log::notice('public-risk no snapshot available', [
                'slug' => $slug,
            ]);

            return response()->json([
                'site' => $slug,
                'score' => 0,
                'level' => 'low',
                'window_size' => $site->risk_window_size,
                'event_count' => 0,
                'computed_at' => null,
            ]);
        }

        return response()->json([
            'site' => $slug,
            'score' => $snapshot->score,
            'level' => strtolower($snapshot->level),
            'window_size' => $snapshot->window_size,
            'event_count' => $snapshot->event_count,
            'computed_at' => optional($snapshot->computed_at)->toIso8601String(),
        ]);
    }
}
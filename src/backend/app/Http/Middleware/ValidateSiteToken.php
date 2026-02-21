<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Site;
use App\Models\SecurityEvent;

class ValidateSiteToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $plainToken = $request->header('X-SITE-TOKEN');

        if (!$plainToken) {
            return response()->json([
                'message' => 'Missing site token'
            ], 401);
        }

        $hashedIncoming = hash('sha256', $plainToken);

        // Constant-time comparison against stored hashes
        $site = Site::all()->first(function ($candidate) use ($hashedIncoming) {
            return hash_equals($candidate->hashed_token, $hashedIncoming);
        });

        if (!$site) {

            SecurityEvent::create([
                'site_id' => null,
                'event_type' => 'invalid_token',
                'description' => 'Invalid site token attempt',
                'occurred_at' => now(),
            ]);

            return response()->json([
                'message' => 'Invalid site token'
            ], 401);
        }

        // Attach validated site to request
        $request->attributes->set('site', $site);

        return $next($request);
    }
}
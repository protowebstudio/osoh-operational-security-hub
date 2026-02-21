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
            return response()->json(['message' => 'Missing site token'], 401);
        }

        $hashedIncoming = hash('sha256', $plainToken);

        $site = Site::where('hashed_token', $hashedIncoming)->first();

        if (!$site) {

            SecurityEvent::create([
                'site_id' => null,
                'event_type' => 'invalid_token',
                'description' => 'Invalid site token attempt',
                'occurred_at' => now(),
            ]);

            return response()->json(['message' => 'Invalid site token'], 401);
        }

        // Attach site to request for downstream usage
        $request->attributes->set('site', $site);

        return $next($request);
    }
}
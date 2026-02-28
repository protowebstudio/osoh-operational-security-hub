<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\IngestionController;

/*
|--------------------------------------------------------------------------
| Public Auth Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['throttle:10,1'])->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

/*
|--------------------------------------------------------------------------
| Public Risk Endpoint (Read-Only)
|--------------------------------------------------------------------------
*/

Route::get('/public-risk/{slug}', [SiteController::class, 'publicRisk']);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toIso8601String(),
    ]);
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout'])
        ->middleware('throttle:20,1');

    Route::get('/protected', function (Request $request) {
        return response()->json([
            'message' => 'Authenticated',
            'user' => $request->user(),
        ]);
    });

    // Site CRUD
    Route::get('/sites', [SiteController::class, 'index']);
    Route::post('/sites', [SiteController::class, 'store']);
    Route::get('/sites/{id}', [SiteController::class, 'show']);
    Route::delete('/sites/{id}', [SiteController::class, 'destroy']);
    Route::post('/sites/{id}/rotate-token', [SiteController::class, 'rotateToken']);

    // Risk computation
    Route::get('/sites/{id}/risk', [SiteController::class, 'risk']);
});

/*
|--------------------------------------------------------------------------
| Ingestion (Token-Based, No User Auth)
|--------------------------------------------------------------------------
*/

Route::post('/ingest', [IngestionController::class, 'ingest'])
    ->middleware(['validate.site.token', 'throttle:60,1']);

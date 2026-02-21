<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\IngestionController;

Route::post('/login', [AuthController::class, 'login']);

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toIso8601String(),
    ]);
});

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

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

// Ingestion (site-token based, not user auth)
Route::post('/ingest', [IngestionController::class, 'ingest'])
    ->middleware(['validate.site.token', 'throttle:60,1']);
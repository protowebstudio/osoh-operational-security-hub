<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'service' => 'osoh-api',
        'status' => 'ok',
        'timestamp' => now()->toIso8601String(),
    ], 200);
});

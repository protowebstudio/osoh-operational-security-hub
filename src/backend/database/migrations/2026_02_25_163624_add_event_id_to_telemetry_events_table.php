<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('telemetry_events', function (Blueprint $table) {
            $table->uuid('event_id')->unique()->after('id');
        });
    }

    public function down(): void
    {
        Schema::table('telemetry_events', function (Blueprint $table) {
            $table->dropColumn('event_id');
        });
    }
};
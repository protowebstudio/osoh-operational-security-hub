<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('telemetry_events', function (Blueprint $table) {
            $table->id();

            $table->foreignId('site_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->enum('severity', ['Low', 'Medium', 'High', 'Critical']);

            $table->timestamp('event_timestamp');

            $table->text('message')->nullable();

            $table->timestamps();

            $table->index(['site_id', 'event_timestamp']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('telemetry_events');
    }
};
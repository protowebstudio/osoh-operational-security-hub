<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('risk_snapshots', function (Blueprint $table) {
            $table->id();

            $table->foreignId('site_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->unsignedInteger('score'); // 0–100 bounded
            $table->string('level');          // Low / Medium / High / Critical

            $table->unsignedInteger('event_count');
            $table->unsignedInteger('window_size');

            $table->timestamp('computed_at');

            $table->timestamps();

            $table->index(['site_id', 'computed_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('risk_snapshots');
    }
};
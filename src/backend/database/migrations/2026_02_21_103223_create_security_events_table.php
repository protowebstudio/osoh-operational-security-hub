<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('security_events', function (Blueprint $table) {
            $table->id();

            $table->foreignId('site_id')
                  ->nullable()
                  ->constrained()
                  ->nullOnDelete();

            $table->string('event_type'); // invalid_token, unauthorized_access, escalation, etc.

            $table->text('description')->nullable();

            $table->timestamp('occurred_at');

            $table->timestamps();

            $table->index(['site_id', 'occurred_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('security_events');
    }
};
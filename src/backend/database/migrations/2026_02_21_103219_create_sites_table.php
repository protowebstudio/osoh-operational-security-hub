<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sites', function (Blueprint $table) {
            $table->id();

            $table->string('name');

            $table->unsignedInteger('risk_threshold_high')->default(50);
            $table->unsignedInteger('risk_threshold_critical')->default(80);
            $table->unsignedInteger('risk_window_size')->default(10);

            $table->string('hashed_token', 64);

            $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sites');
    }
};
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Site;
use App\Models\User;

class SiteFactory extends Factory
{
    protected $model = Site::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),

            'risk_threshold_high' => 50,
            'risk_threshold_critical' => 80,
            'risk_window_size' => 10,

            // Deterministic default token (can be overridden in tests)
            'hashed_token' => hash('sha256', 'factory-token'),

            // Enforce foreign key integrity automatically
            'user_id' => User::factory(),
        ];
    }
}
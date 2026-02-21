<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Site extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'risk_threshold_high',
        'risk_threshold_critical',
        'risk_window_size',
        'hashed_token',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function telemetryEvents()
    {
        return $this->hasMany(TelemetryEvent::class);
    }

    public function riskSnapshots()
    {
        return $this->hasMany(RiskSnapshot::class);
    }

    public function securityEvents()
    {
        return $this->hasMany(SecurityEvent::class);
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TelemetryEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'site_id',
        'severity',
        'event_timestamp',
        'message',
    ];

    protected $casts = [
        'event_timestamp' => 'datetime',
    ];

    public function site()
    {
        return $this->belongsTo(Site::class);
    }
}
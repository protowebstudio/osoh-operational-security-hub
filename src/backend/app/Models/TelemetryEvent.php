<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

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

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->event_id)) {
                $model->event_id = (string) Str::uuid();
            }
        });
    }

    public function site()
    {
        return $this->belongsTo(Site::class);
    }
}
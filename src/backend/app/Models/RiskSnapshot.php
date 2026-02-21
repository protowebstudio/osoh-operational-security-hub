<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RiskSnapshot extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_id',
        'score',
        'level',
        'event_count',
        'window_size',
        'computed_at',
    ];

    protected $casts = [
        'computed_at' => 'datetime',
    ];

    public function site()
    {
        return $this->belongsTo(Site::class);
    }
}
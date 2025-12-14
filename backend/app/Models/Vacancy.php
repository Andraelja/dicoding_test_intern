<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Position;

class Vacancy extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'position_id',
        'job_type',
        'quota',
        'active_until',
        'location',
        'is_remote',
        'description',
        'min_salary',
        'max_salary',
        'is_show_salary',
        'min_experience',
    ];

    protected $casts = [
        'active_until' => 'date',
        'is_remote' => 'boolean',
        'is_show_salary' => 'boolean'
    ];

    public function position() {
        return $this->belongsTo(Position::class);
    }
}

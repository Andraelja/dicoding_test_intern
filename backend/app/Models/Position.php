<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Vacancy;

class Position extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function vacancies() {
        return $this->hasMany(Vacancy::class);
    }
}

<?php
namespace App\Repositories;

use App\Models\Position;

class PositionRepository
{
    public function getAll()
    {
        return Position::latest()->get();
    }
}
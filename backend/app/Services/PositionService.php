<?php
namespace App\Services;

use App\Repositories\PositionRepository;

class PositionService
{
    public function __construct(protected PositionRepository $repository){}

    public function index()
    {
        return $this->repository->getAll();
    }
}
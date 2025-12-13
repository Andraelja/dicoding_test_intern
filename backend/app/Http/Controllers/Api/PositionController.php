<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\PositionRequest;
use App\Http\Resources\PositionResource;
use App\Services\PositionService;
use App\Traits\ApiResponse;

class PositionController extends Controller
{
    use ApiResponse;

    public function __construct(private PositionService $service) {}

    public function index()
    {
        $position = $this->service->index();
        return $this->successResponse(
            PositionResource::collection($position),
            'Data berhasil diambil'
        );
    }
}

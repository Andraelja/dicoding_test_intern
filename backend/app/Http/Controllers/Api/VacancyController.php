<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\VacancyRequest;
use App\Http\Resources\VacancyResource;
use App\Services\VacancyService;
use App\Traits\ApiResponse;

class VacancyController extends Controller
{
    use ApiResponse;

    public function __construct(private VacancyService $service) {}

    public function index()
    {
        $vacancies = $this->service->index();
        return $this->successResponse(
            VacancyResource::collection($vacancies),
            'Data berhasil diambil'
        );
    }

    public function show(int $id)
    {
        $vacancy = $this->service->show($id);
        return $this->successResponse(
            new VacancyResource($vacancy),
            'Data berhasil ditemukan'
        );
    }

    public function store(VacancyRequest $request)
    {
        $vacancy = $this->service->create($request->validated());
        return $this->successResponse(
            new VacancyResource($vacancy),
            'Data berhasil ditambahkan',
            201
        );
    }

    public function update(VacancyRequest $request, int $id)
    {
        $vacancy = $this->service->update($request->validated(), $id);
        return $this->successResponse(
            new VacancyResource($vacancy),
            'Data berhasil diupdate'
        );
    }

    public function destroy(int $id)
    {
        $this->service->delete($id);
        return $this->successResponse(
            null,
            'Data berhasil dihapus'
        );
    }
}
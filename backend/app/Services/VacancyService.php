<?php
namespace App\Services;

use App\Repositories\VacancyRepository;

class VacancyService
{
    public function __construct(protected VacancyRepository $repository){}

    public function index()
    {
        return $this->repository->getAll();
    }

    public function create(array $data)
    {
        return $this->repository->create($data);
    }

    public function show(int $id)
    {
        return $this->repository->findById($id);
    }

    public function update(array $data, int $id)
    {
        $vacancy = $this->repository->findById($id);
        return $this->repository->update($vacancy, $data);
    }

    public function delete(int $id): bool
    {
        return $this->repository->delete($id);
    }
}
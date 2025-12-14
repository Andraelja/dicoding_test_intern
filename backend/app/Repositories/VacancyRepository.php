<?php
namespace App\Repositories;

use App\Models\Vacancy;

class VacancyRepository
{
    public function getAll() {
        return Vacancy::with('position')->latest()->get();
    }

    public function search(string $keyword)
    {
        return Vacancy::with('position')
            ->where(function ($query) use ($keyword) {
                $query->where('title', 'like', "%{$keyword}%")
                    ->orWhere('location', 'like', "%{$keyword}%")
                    ->orWhereHas('position', function ($q) use ($keyword) {
                        $q->where('name', 'like', "%{$keyword}%");
                    });
            })
            ->latest()
            ->get();
    }

    public function findById(int $id) {
        return Vacancy::with('position')->findOrFail($id);
    }

    public function create(array $data) {
        return Vacancy::create($data);
    }

    public function update(Vacancy $vacancy, array $data)
    {
        $vacancy->update($data);
        return $vacancy;
    }

    public function delete(int $id): bool {
        $vacancy = Vacancy::findOrFail($id);
        return $vacancy->delete();
    }
}

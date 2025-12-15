<?php

namespace Database\Factories;

use App\Models\Vacancy;
use App\Models\Position;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

class VacancyFactory extends Factory
{
    protected $model = Vacancy::class;

    public function definition(): array
    {
        $minSalary = $this->faker->numberBetween(2000000, 5000000);
        $maxSalary = $minSalary + $this->faker->numberBetween(1000000, 3000000);

        return [
            'title' => $this->faker->randomElement([
                'Backend Developer',
                'Frontend Developer',
                'Fullstack Developer',
                'Marketing Manager',
                'HR Specialist',
                'Finance Analyst',
                'Operations Manager',
                'Sales Executive'
            ]),
            'position_id' => Position::factory(),
            'job_type' => $this->faker->randomElement(['full-time', 'part-time', 'contract']), // Hapus 'internship'
            'quota' => $this->faker->numberBetween(1, 5),
            'active_until' => Carbon::now()->addWeeks($this->faker->numberBetween(2, 8))->format('Y-m-d'),
            'location' => $this->faker->randomElement([
                'Jakarta, Indonesia',
                'Surabaya, Indonesia',
                'Bandung, Indonesia',
                'Yogyakarta, Indonesia',
                'Bali, Indonesia'
            ]),
            'is_remote' => $this->faker->boolean(),
            'description' => $this->faker->paragraph(3),
            'min_salary' => $minSalary,
            'max_salary' => $maxSalary,
            'is_show_salary' => $this->faker->boolean(),
            'min_experience' => $this->faker->randomElement(['0 Tahun', '1 Tahun', '2 Tahun', '3 Tahun', '5 Tahun']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
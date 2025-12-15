<?php

namespace Database\Factories;

use App\Models\Position;
use Illuminate\Database\Eloquent\Factories\Factory;

class PositionFactory extends Factory
{
    protected $model = Position::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'Developer',
                'Marketing',
                'Human Resources',
                'Finance',
                'Operations',
                'Sales',
                'Customer Service',
                'Product Management',
                'Design',
                'Quality Assurance'
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
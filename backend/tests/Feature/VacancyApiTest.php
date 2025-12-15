<?php

namespace Tests\Feature;

use App\Models\Position;
use App\Models\Vacancy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VacancyApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function can_list_vacancies()
    {
        $position = Position::factory()->create();

        Vacancy::factory()->count(2)->create([
            'position_id' => $position->id
        ]);

        $response = $this->getJson('/api/vacancies');

        $response
            ->assertStatus(200)
            ->assertJsonCount(2, 'data');
    }

    /** @test */

    /**
     * @test
     */
    public function can_create_vacancy()
    {
        $this->withoutMiddleware();

        $position = Position::factory()->create();

        $payload = [
            'title' => 'Backend Engineer',
            'position_id' => $position->id,
            'job_type' => 'full-time',
            'quota' => 3,
            'active_until' => now()->addMonth()->format('Y-m-d'),
            'location' => 'Jakarta',
            'is_remote' => true,
            'description' => 'Great opportunity',
            'min_salary' => 5000000,
            'max_salary' => 8000000,
            'is_show_salary' => true,
            'min_experience' => '2 Tahun',
        ];

        $response = $this->postJson('/api/vacancies', $payload);

        $response
            ->assertStatus(201)
            ->assertJsonFragment([
                'title' => 'Backend Engineer',
            ]);
    }
}

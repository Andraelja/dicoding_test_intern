<?php

namespace Tests\Unit;

use App\Models\Position;
use App\Models\Vacancy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VacancyTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function vacancy_belongs_to_position()
    {
        $position = Position::factory()->create();
        $vacancy = Vacancy::factory()->create([
            'position_id' => $position->id,
        ]);

        $this->assertInstanceOf(
            Position::class,
            $vacancy->position
        );
    }

    /** @test */
    public function vacancy_casts_is_remote_to_boolean()
    {
        $vacancy = Vacancy::factory()->create([
            'is_remote' => 1,
        ]);

        $this->assertIsBool($vacancy->is_remote);
    }
}

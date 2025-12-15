<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RolesSeeder;
use Database\Seeders\VacancySeeder;
use Database\Seeders\PositionSeeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            RolesSeeder::class,
            PositionSeeder::class,
            UserSeeder::class,
            VacancySeeder::class,
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class VacancySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('vacancies')->insert([
            [
                'title' => 'Software Engineer Intern',
                'position_id' => 1,
                'job_type' => 'intern',
                'quota' => 3,
                'active_until' => Carbon::now()->addMonth()->format('Y-m-d'),
                'location' => 'Bandung, Indonesia',
                'is_remote' => true,
                'description' => 'Magang sebagai Software Engineer dengan fokus pada backend dan API development.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Frontend Developer',
                'position_id' => 2,
                'job_type' => 'full-time',
                'quota' => 2,
                'active_until' => Carbon::now()->addWeeks(3)->format('Y-m-d'),
                'location' => 'Jakarta, Indonesia',
                'is_remote' => false,
                'description' => 'Bertanggung jawab membangun antarmuka pengguna yang interaktif menggunakan Laravel dan Vue.js.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Backend Developer',
                'position_id' => 2,
                'job_type' => 'full-time',
                'quota' => 2,
                'active_until' => Carbon::now()->addWeeks(4)->format('Y-m-d'),
                'location' => 'Surabaya, Indonesia',
                'is_remote' => true,
                'description' => 'Mengembangkan API dan manajemen database dengan Laravel serta memastikan keamanan sistem.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

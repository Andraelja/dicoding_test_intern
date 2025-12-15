<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            ['name' => 'admin', 'email' => 'admin@mail.com', 'password' => Hash::make('admin12345'), 'role_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'user', 'email' => 'user@mail.com', 'password' => Hash::make('user12345'), 'role_id' => 2, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}

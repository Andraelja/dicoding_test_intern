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
            ['name' => 'Andra Elja Prama', 'email' => 'andra@mail.com', 'password' => Hash::make('andra123'), 'role_id' => '1', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Salsabila Husnul Mardhiyyah', 'email' => 'caca@mail.com', 'password' => Hash::make('cacacantik123'), 'role_id' => '2', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}

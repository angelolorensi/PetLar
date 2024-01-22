<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AgeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $age = ['Filhote', 'Adulto','Idoso'];

        foreach ($age as $age) {
            DB::table('age')->insert(['name' => $age]);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Age;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AgeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Age::firstOrCreate(['name' => 'Filhote']);
        Age::firstOrCreate(['name' => 'Adulto']);
        Age::firstOrCreate(['name' => 'Idoso']);
    }
}

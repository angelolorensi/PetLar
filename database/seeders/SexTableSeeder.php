<?php

namespace Database\Seeders;

use App\Models\Sex;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SexTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Sex::firstOrCreate(['name' => 'Fêmea']);
        Sex::firstOrCreate(['name' => 'Macho']);
    }
}

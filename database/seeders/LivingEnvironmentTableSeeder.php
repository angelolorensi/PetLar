<?php

namespace Database\Seeders;

use App\Models\LivingEnvironment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LivingEnvironmentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LivingEnvironment::firstOrCreate(['name' => 'Apartamento']);
        LivingEnvironment::firstOrCreate(['name' => 'Apartamento telado']);
        LivingEnvironment::firstOrCreate(['name' => 'Casa com quintal fechado']);
    }
}

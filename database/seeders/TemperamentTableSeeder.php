<?php

namespace Database\Seeders;

use App\Models\Temperament;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TemperamentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Temperament::firstOrCreate(['name' => 'Agressivo']);
        Temperament::firstOrCreate(['name' => 'Arisco']);
        Temperament::firstOrCreate(['name' => 'Brincalhão']);
        Temperament::firstOrCreate(['name' => 'Calmo']);
        Temperament::firstOrCreate(['name' => 'Carente']);
        Temperament::firstOrCreate(['name' => 'Dócil']);
        Temperament::firstOrCreate(['name' => 'Independente']);
        Temperament::firstOrCreate(['name' => 'Sociável']);
    }
}

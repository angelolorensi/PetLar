<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TemperamentSeeder extends Seeder
{
    public function run()
    {
        $temperaments = ['Agressivo', 'Arisco', 'Brincalhão', 'Calmo', 'Carente', 'Dócil', 'Independente', 'Sociável'];

        foreach ($temperaments as $temperament) {
            DB::table('temperament')->insert(['name' => $temperament]);
        }
    }
}

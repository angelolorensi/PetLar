<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpecieSeeder extends Seeder
{
    public function run()
    {
        $species = ['Canino', 'Felino'];

        foreach ($species as $specie) {
            DB::table('specie')->insert(['name' => $specie]);
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SexSeeder extends Seeder
{
    public function run()
    {
        $genders = ['Fêmea', 'Macho'];

        foreach ($genders as $gender) {
            DB::table('sex')->insert(['name' => $gender]);
        }
    }
}

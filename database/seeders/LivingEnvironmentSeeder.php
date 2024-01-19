<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LivingEnvironmentSeeder extends Seeder
{
    public function run()
    {
        $environments = ['Apartamento', 'Apartamento telado', 'Casa com quintal fechado'];

        foreach ($environments as $environment) {
            DB::table('living_environment')->insert(['name' => $environment]);
        }
    }
}

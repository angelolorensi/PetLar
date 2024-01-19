<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SocializesWithSeeder extends Seeder
{
    public function run()
    {
        $socializesWith = ['Cachorros', 'Gatos', 'Crianças', 'Pessoas desconhecidas'];

        foreach ($socializesWith as $socialize) {
            DB::table('socializes_with')->insert(['name' => $socialize]);
        }
    }
}

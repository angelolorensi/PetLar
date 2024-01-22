<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SizeSeeder extends Seeder
{
    public function run()
    {
        $sizes = ['Pequeno', 'Médio', 'Grande'];

        foreach ($sizes as $size) {
            DB::table('size')->insert(['name' => $size]);
        }
    }
}

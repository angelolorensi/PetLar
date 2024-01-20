<?php

namespace Database\Seeders;

use App\Models\SocializesWith;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SocializesWithTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SocializesWith::firstOrCreate(['name' => 'Cachorros']);
        SocializesWith::firstOrCreate(['name' => 'Gatos']);
        SocializesWith::firstOrCreate(['name' => 'Crianças']);
        SocializesWith::firstOrCreate(['name' => 'Pessoas desconhecidas']);
    }
}

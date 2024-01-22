<?php

namespace Database\Seeders;

use App\Models\Size;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SizeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Size::firstOrCreate(['name' => 'Pequeno']);
        Size::firstOrCreate(['name' => 'Médio']);
        Size::firstOrCreate(['name' => 'Grande']);
    }
}

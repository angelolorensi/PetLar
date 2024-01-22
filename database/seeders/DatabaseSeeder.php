<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SpeciesTableSeeder::class,
            SexTableSeeder::class,
            SizeTableSeeder::class,
            AgeTableSeeder::class,
            TemperamentTableSeeder::class,
            LivingEnvironmentTableSeeder::class,
            SocializesWithTableSeeder::class,
        ]);
    }
}

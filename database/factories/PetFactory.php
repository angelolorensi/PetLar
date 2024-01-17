<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pet>
 */
class PetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'species' => $this->faker->randomElement(['Canino', 'Felino']),
            'sex' => $this->faker->randomElement(['Macho', 'Fêmea']),
            'size' => $this->faker->randomElement(['Pequeno', 'Médio', 'Grande']),
            'age' => $this->faker->randomElement(['Filhote', 'Adulto', 'Idoso']),
            'neutered' => $this->faker->boolean,
            'vaccinated' => $this->faker->boolean,
            'dewormed' => $this->faker->boolean,
            'special_care' => $this->faker->boolean,
            'temperament' => $this->faker->randomElement(['Agressivo', 'Arisco', 'Brincalhão', 'Calmo', 'Carente', 'Dócil', 'Independente', 'Sociável']),
            'living_environment' => $this->faker->randomElement(['Apartamento', 'Apartamento telado', 'Casa com quintal fechado']),
            'socializes_with' => $this->faker->randomElement(['Cachorros', 'Gatos', 'Crianças', 'Pessoas desconhecidas']),
            'description' => $this->faker->paragraph,
        ];
    }
}

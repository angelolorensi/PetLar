<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePetRequest;
use App\Http\Requests\UpdatePetRequest;
use App\Models\Pet;
use Illuminate\Http\Request;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Pet::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'species' => 'required|string|in:Canino,Felino',
            'sex' => 'required|string|in:Fêmea,Macho',
            'size' => 'required|string|in:Pequeno,Médio,Grande',
            'age' => 'required|string|in:Filhote,Adulto,Idoso',
            'neutered' => 'required|boolean',
            'vaccinated' => 'required|boolean',
            'dewormed' => 'required|boolean',
            'special_care' => 'required|boolean',
            'temperament' => 'required|string|in:Agressivo,Arisco,Brincalhão,Calmo,Carente,Dócil,Independente,Sociável',
            'living_environment' => 'required|string|in:Apartamento,Apartamento telado,Casa com quintal fechado',
            'socializes_with' => 'required|string|in:Cachorros,Gatos,Crianças,Pessoas desconhecidas',
            'description' => 'nullable|string',
        ]);

        $pet = Pet::create($data);

        return response()->json($pet, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pet $pet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePetRequest $request, Pet $pet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pet $pet)
    {
        //
    }
}

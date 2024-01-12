<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePetRequest;
use App\Http\Requests\UpdatePetRequest;
use App\Models\Pet;
use App\Models\PetImage;
use Illuminate\Http\Request;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = Pet::with('images');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%$search%");
            $query->orWhere('living_environment', 'like', "%$search%");
            $query->orWhere('species', 'like', "%$search%");
            $query->orWhere('temperament', 'like', "%$search%");
            $query->orWhere('size', 'like', "%$search%");
            $query->orWhere('age', 'like', "%$search%");
        }

        $pets = $query->paginate(9);

        $formattedPets = $pets->map(function ($pet) {
            return [
                'id' => $pet->id,
                'name' => $pet->name,
                'species' => $pet->species,
                'sex' => $pet->sex,
                'size' => $pet->size,
                'age' => $pet->age,
                'neutered' => $pet->neutered,
                'vaccinated' => $pet->vaccinated,
                'dewormed' => $pet->dewormed,
                'special_care' => $pet->special_care,
                'temperament' => $pet->temperament,
                'living_environment' => $pet->living_environment,
                'socializes_with' => $pet->socializes_with,
                'description' => $pet->description,
                'images' => $pet->images->pluck('image_path'),
                'created_at' => $pet->created_at,
                'updated_at' => $pet->updated_at,
            ];
        });

        return response()->json([
            'data' => $formattedPets,
            'current_page' => $pets->currentPage(),
            'last_page' => $pets->lastPage(),
            'total' => $pets->total(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePetRequest $request)
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
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:10000',
        ]);

        $pet = Pet::create($data);

        if ($request->hasFile('images')) {
            $images = [];
            foreach ($request->file('images') as $image) {
                $imageName = time() . '_' . $image->getClientOriginalName();
                $path = $image->storeAs('pet_images', $imageName, 'public');
                $images[] = $path;
                PetImage::create([
                    'pet_id' => $pet->id,
                    'image_path' => $path,
                ]);
            }
            $pet->images = $images;
        }

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

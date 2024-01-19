<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePetRequest;
use App\Http\Requests\UpdatePetRequest;
use App\Models\Pet;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
            $query->where('name', 'ilike', "%$search%");
            $query->orWhere('living_environment', 'ilike', "%$search%");
            $query->orWhere('specie', 'ilike', "%$search%");
            $query->orWhere('temperament', 'ilike', "%$search%");
            $query->orWhere('size', 'ilike', "%$search%");
            $query->orWhere('age', 'ilike', "%$search%");
        }

        $pets = $query->paginate(9);

        $formattedPets = $pets->map(function ($pet) {
            return [
                'id' => $pet->id,
                'user_id' => Auth::id(),
                'name' => $pet->name,
                'specie' => $pet->specie,
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
     * Display the specified resource.
     */
    public function show(Pet $pet)
    {
        $formattedPet = [
            'id' => $pet->id,
            'user_id' => Auth::id(),
            'name' => $pet->name,
            'specie' => $pet->specie,
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

        return response()->json(['data' => $formattedPet]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePetRequest $request)
    {
        $pet = auth()->user()->pets()->create($request->validated());

        if ($request->hasFile('images')) {
            $images = [];
            foreach ($request->file('images') as $image) {
                $imageName = time() . '_' . $image->getClientOriginalName();
                $path = $image->storeAs('pet_images', $imageName, 'public');
                $images[] = $path;
                Image::create([
                    'pet_id' => $pet->id,
                    'image_path' => $path,
                ]);
            }
            $pet->images = $images;
        }

        return response()->json($pet, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePetRequest $request, Pet $pet)
    {
        $pet->update($request->validated());
        $pet->images()->delete();

        if ($request->hasFile('images')) {
            $images = [];
            foreach ($request->file('images') as $image) {
                $imageName = time() . '_' . $image->getClientOriginalName();
                $path = $image->storeAs('pet_images', $imageName, 'public');
                $images[] = $path;
                Image::create([
                    'pet_id' => $pet->id,
                    'image_path' => $path,
                ]);
            }
            $pet->images = $images;
        }

        $pet = Pet::with('images')->find($pet->id);

        return response()->json($pet, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pet $pet)
    {
        if (auth()->user()->id !== $pet->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $pet->delete();

        return response()->json(['message' => 'Pet deleted successfully'], 200);
    }


}

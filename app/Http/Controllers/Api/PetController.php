<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePetRequest;
use App\Http\Requests\UpdatePetRequest;
use App\Http\Resources\PetResource;
use App\Models\Age;
use App\Models\Image;
use App\Models\LivingEnvironment;
use App\Models\Pet;
use App\Models\Sex;
use App\Models\Size;
use App\Models\SocializesWith;
use App\Models\Species;
use App\Models\Temperament;
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

            $query->where(function ($q) use ($search) {
                $q->where('name', 'ilike', "%$search%")
                    ->orWhereHas('species', function ($q) use ($search) {
                        $q->where('name', 'ilike', "%$search%");
                    })
                    ->orWhereHas('temperament', function ($q) use ($search) {
                        $q->where('name', 'ilike', "%$search%");
                    })
                    ->orWhereHas('size', function ($q) use ($search) {
                        $q->where('name', 'ilike', "%$search%");
                    })
                    ->orWhereHas('age', function ($q) use ($search) {
                        $q->where('name', 'ilike', "%$search%");
                    })
                    ->orWhereHas('livingEnvironment', function ($q) use ($search) {
                        $q->where('name', 'ilike', "%$search%");
                    })
                    ->orWhereHas('socializesWith', function ($q) use ($search) {
                        $q->where('name', 'ilike', "%$search%");
                    });
            });
        }

        $pets = $query->paginate(9);

        $formattedPets = PetResource::collection($pets);

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
        $formattedPet = new PetResource($pet);

        return response()->json(['data' => $formattedPet]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePetRequest $request)
    {
        $species = Species::firstOrCreate(['name' => $request->input('species')]);
        $sex = Sex::firstOrCreate(['name' => $request->input('sex')]);
        $size = Size::firstOrCreate(['name' => $request->input('size')]);
        $age = Age::firstOrCreate(['name' => $request->input('age')]);
        $temperament = Temperament::firstOrCreate(['name' => $request->input('temperament')]);
        $livingEnvironment = LivingEnvironment::firstOrCreate(['name' => $request->input('living_environment')]);
        $socializesWith = SocializesWith::firstOrCreate(['name' => $request->input('socializes_with')]);

        $pet = new Pet();

        $pet->name = $request->input('name');
        $pet->neutered = $request->input('neutered');
        $pet->vaccinated = $request->input('vaccinated');
        $pet->dewormed = $request->input('dewormed');
        $pet->special_care = $request->input('special_care');
        $pet->description = $request->input('description');
        $pet->user_id = $request->user_id;

        $pet->species()->associate($species);
        $pet->sex()->associate($sex);
        $pet->size()->associate($size);
        $pet->age()->associate($age);
        $pet->save();
        $pet->temperament()->attach($temperament->temperament_id);
        $pet->livingEnvironment()->attach($livingEnvironment->living_environment_id);
        $pet->socializesWith()->attach($socializesWith->socializes_with_id);

        if ($request->hasFile('images')) {
            $images = [];
            foreach ($request->file('images') as $image) {
                $imageName = time() . '_' . $image->getClientOriginalName();
                $path = $image->storeAs('pet_images', $imageName, 'public');
                $images[] = $path;
                Image::create([
                    'pet_id' => $pet->pet_id,
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
                PetImage::create([
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

        $pet->temperament()->detach();
        $pet->livingEnvironment()->detach();
        $pet->socializesWith()->detach();

        $pet->delete();

        return response()->json(['message' => 'Pet deleted successfully'], 200);
    }


}

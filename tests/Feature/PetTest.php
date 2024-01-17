<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Pet;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Faker\Factory as FakerFactory;
use Illuminate\Http\Response;

class PetTest extends TestCase
{
    use RefreshDatabase;

    /** @var \Faker\Generator */
    protected $faker;

    protected function setUp(): void
    {
        parent::setUp();
        $this->faker = FakerFactory::create();
    }

    /** @test */
    public function should_return_a_list_of_pets()
    {
        $user = User::factory()->create();
        $this->actingAs($user);
        Pet::factory(10)->create(['user_id' => $user->id]);

        $response = $this->getJson('/api/pets');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'user_id',
                    'name',
                    'species',
                    'sex',
                    'size',
                    'age',
                    'neutered',
                    'vaccinated',
                    'dewormed',
                    'special_care',
                    'temperament',
                    'living_environment',
                    'socializes_with',
                    'description',
                    'images',
                    'created_at',
                    'updated_at',
                ],
            ],
            'current_page',
            'last_page',
            'total',
        ]);
    }

    /** @test */
    public function should_return_a_single_pet()
    {
        $user = User::factory()->create();
        $pet = Pet::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->getJson("/api/pets/{$pet->id}");

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'data' => [
                'id',
                'user_id',
                'name',
                'species',
                'sex',
                'size',
                'age',
                'neutered',
                'vaccinated',
                'dewormed',
                'special_care',
                'temperament',
                'living_environment',
                'socializes_with',
                'description',
                'images',
                'created_at',
                'updated_at',
            ],
        ]);

        $response->assertJson([
            'data' => [
                'id' => $pet->id,
                'user_id' => $user->id,
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
                'images' => $pet->images->pluck('image_path')->toArray(),
                'created_at' => $pet->created_at->toISOString(),
                'updated_at' => $pet->updated_at->toISOString(),
            ],
        ]);
    }

    /** @test */
    public function should_store_a_new_pet()
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $imageFile = UploadedFile::fake()->image('test_image.jpg');

        $response = $this->postJson('/api/pets', [
            'name' => 'Test Pet',
            'species' => 'Canino',
            'sex' => 'Macho',
            'size' => 'Grande',
            'age' => 'Adulto',
            'neutered' => true,
            'vaccinated' => false,
            'dewormed' => true,
            'special_care' => false,
            'temperament' => 'Brincalhão',
            'living_environment' => 'Casa com quintal fechado',
            'socializes_with' => 'Cachorros',
            'description' => $this->faker->paragraph,
            'images' => [$imageFile],
        ]);

        $response->assertStatus(201);

        $response->assertJsonStructure([
            'id',
            'user_id',
            'name',
            'species',
            'sex',
            'size',
            'age',
            'neutered',
            'vaccinated',
            'dewormed',
            'special_care',
            'temperament',
            'living_environment',
            'socializes_with',
            'description',
            'images',
            'created_at',
            'updated_at',
        ]);

        $this->assertDatabaseHas('pets', ['name' => 'Test Pet']);

        $actualImagePath = $response->json('images')[0];

        $this->assertDatabaseHas('pet_images', [
            'pet_id' => $response->json('id'),
            'image_path' => $actualImagePath,
        ]);

        Storage::disk('public')->delete('pet_images/' . $imageFile->hashName());
    }

    /** @test */
    public function should_update_existing_pet()
    {
        $user = User::factory()->create();
        $pet = Pet::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user);

        $imageFile = UploadedFile::fake()->image('test_image.jpg');

        $response = $this->postJson("/api/pets/{$pet->id}", [
            'name' => 'Updated Pet Name',
            'species' => 'Canino',
            'sex' => 'Macho',
            'size' => 'Grande',
            'age' => 'Adulto',
            'neutered' => true,
            'vaccinated' => false,
            'dewormed' => true,
            'special_care' => false,
            'temperament' => 'Brincalhão',
            'living_environment' => 'Casa com quintal fechado',
            'socializes_with' => 'Cachorros',
            'description' => $this->faker->paragraph,
            'images' => [$imageFile],
        ]);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'id',
            'user_id',
            'name',
            'species',
            'sex',
            'size',
            'age',
            'neutered',
            'vaccinated',
            'dewormed',
            'special_care',
            'temperament',
            'living_environment',
            'socializes_with',
            'description',
            'images',
            'created_at',
            'updated_at',
        ]);

        $this->assertDatabaseHas('pets', [
            'id' => $pet->id,
            'name' => 'Updated Pet Name',
        ]);

        Storage::disk('public')->delete('pet_images/' . $imageFile->hashName());
    }

    /** @test */
    public function should_delete_pet_if_authorized()
    {
        $user = User::factory()->create();
        $pet = Pet::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->deleteJson("/api/pets/{$pet->id}");

        $response->assertStatus(Response::HTTP_OK);

        $response->assertJson([
            'message' => 'Pet deleted successfully',
        ]);

        $this->assertDatabaseMissing('pets', ['id' => $pet->id]);
    }

    /** @test */
    public function should_not_delete_pet_if_unauthorized()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $pet = Pet::factory()->create(['user_id' => $user1->id]);

        $this->actingAs($user2);

        $response = $this->deleteJson("/api/pets/{$pet->id}");

        $response->assertStatus(Response::HTTP_FORBIDDEN);

        $response->assertJson([
            'error' => 'Unauthorized',
        ]);

        $this->assertDatabaseHas('pets', ['id' => $pet->id]);
    }
}

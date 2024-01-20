<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->pet_id,
            'user_id' => $this->user_id,
            'name' => $this->name,
            'species' => $this->species->name,
            'sex' => $this->sex->name,
            'size' => $this->size->name,
            'age' => $this->age->name,
            'neutered' => $this->neutered,
            'vaccinated' => $this->vaccinated,
            'dewormed' => $this->dewormed,
            'special_care' => $this->special_care,
            'temperament' => $this->temperament->name,
            'living_environment' => $this->livingEnvironment->name,
            'socializes_with' => $this->socializesWith->name,
            'description' => $this->description,
            'images' => $this->images->pluck('image_path'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

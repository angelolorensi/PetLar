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
            'id' => $this->id,
            'name' => $this->name,
            'specie' => $this->specie,
            'sex' => $this->sex,
            'size' => $this->size,
            'age' => $this->age,
            'neutered' => $this->neutered,
            'vaccinated' => $this->vaccinated,
            'dewormed' => $this->dewormed,
            'special_care' => $this->special_care,
            'temperament' => $this->temperament,
            'living_environment' => $this->living_environment,
            'socializes_with' => $this->socializes_with,
            'description' => $this->description,
            'images' => $this->images->pluck('image_path'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

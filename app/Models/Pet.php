<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    use HasFactory;

    protected $fillable = [
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
    ];

    public function images()
    {
        return $this->hasMany(PetImage::class);
    }
}

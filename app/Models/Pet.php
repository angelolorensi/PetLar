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

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function images()
    {
        return $this->hasMany(PetImage::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($pet) {
            $pet->images()->delete();
        });
    }

}

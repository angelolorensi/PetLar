<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pet extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pets';
    protected $primaryKey = 'pet_id';

    protected $fillable = [
        'name',
        'neutered',
        'vaccinated',
        'dewormed',
        'special_care',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class, 'pet_id');
    }

    public function species()
    {
        return $this->belongsTo(Species::class, 'species_id', 'specie_id');
    }

    public function sex()
    {
        return $this->belongsTo(Sex::class, 'sex_id', 'sex_id');
    }

    public function size()
    {
        return $this->belongsTo(Size::class, 'size_id', 'size_id');
    }

    public function age()
    {
        return $this->belongsTo(Age::class, 'age_id', 'age_id');
    }

    public function temperament()
    {
        return $this->belongsToMany(Temperament::class, 'pet_temperament', 'pet_id', 'temperament_id');
    }

    public function livingEnvironment()
    {
        return $this->belongsToMany(LivingEnvironment::class, 'pet_living_environment', 'pet_id', 'living_environment_id');
    }

    public function socializesWith()
    {
        return $this->belongsToMany(SocializesWith::class, 'pet_socializes_with', 'pet_id', 'socializes_with_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($pet) {
            $pet->images()->delete();
        });
    }
}

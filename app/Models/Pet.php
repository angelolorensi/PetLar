<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'specie_id',
        'sex_id',
        'size_id',
        'age_id',
        'neutered',
        'vaccinated',
        'dewormed',
        'special_care',
        'temperament_id',
        'living_environment_id',
        'socializes_with_id',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function specie()
    {
        return $this->belongsTo(Specie::class, 'specie_id');
    }

    public function sex()
    {
        return $this->belongsTo(Sex::class, 'sex_id');
    }

    public function size()
    {
        return $this->belongsTo(Size::class, 'size_id');
    }

    public function age()
    {
        return $this->belongsTo(Age::class, 'age_id');
    }

    public function temperament()
    {
        return $this->belongsTo(Temperament::class, 'temperament_id');
    }

    public function livingEnvironment()
    {
        return $this->belongsTo(LivingEnvironment::class, 'living_environment_id');
    }

    public function socializesWith()
    {
        return $this->belongsTo(SocializesWith::class, 'socializes_with_id');
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($pet) {
            $pet->images()->delete();
        });
    }

}


<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Specie extends Model
{
    protected $fillable = ['name'];

    public function pets()
    {
        return $this->hasMany(Pet::class, 'specie_id');
    }
}

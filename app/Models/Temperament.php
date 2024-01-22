<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Temperament extends Model
{
    protected $fillable = ['name'];

    public function pets()
    {
        return $this->hasMany(Pet::class, 'temperament_id');
    }
}

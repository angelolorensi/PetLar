<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LivingEnvironment extends Model
{
    protected $fillable = ['name'];

    public function pets()
    {
        return $this->hasMany(Pet::class, 'living_environment_id');
    }
}

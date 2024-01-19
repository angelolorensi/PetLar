<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LivingEnvironment extends Model
{
    protected $table = 'living_environment';
    protected $primaryKey = 'living_environment_id';
    protected $fillable = ['name'];

    public function pets()
    {
        return $this->hasMany(Pet::class, 'living_environment_id');
    }
}

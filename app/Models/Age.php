<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Age extends Model
{
    protected $fillable = ['name'];

    public function pets()
    {
        return $this->hasMany(Pet::class, 'age_id');
    }
}

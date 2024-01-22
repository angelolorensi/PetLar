<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    protected $fillable = ['name'];

    public function pets()
    {
        return $this->hasMany(Pet::class, 'size_id');
    }
}

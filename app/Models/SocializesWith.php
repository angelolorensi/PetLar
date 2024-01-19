<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocializesWith extends Model
{
    protected $fillable = ['name'];

    public function pets()
    {
        return $this->hasMany(Pet::class, 'socializes_with_id');
    }
}

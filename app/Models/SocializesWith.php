<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocializesWith extends Model
{
    protected $table = 'socializes_with';
    protected $primaryKey = 'socializes_with_id';
    protected $fillable = ['name'];

    public function pets()
    {
        return $this->hasMany(Pet::class, 'socializes_with_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sex extends Model
{
    protected $table = 'sex';
    protected $primaryKey = 'sex_id';
    protected $fillable = ['name'];

    public function pets()
    {
        return $this->hasMany(Pet::class, 'sex_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LivingEnvironment extends Model
{
    use HasFactory;

    protected $table = 'living_environments';
    protected $primaryKey = 'living_environment_id';
    public $timestamps = false;

    protected $fillable = ['name'];

    public function pets()
    {
        return $this->belongsToMany(LivingEnvironment::class, 'living_environment_pet', 'pet_id', 'living_environment_id');
    }
}

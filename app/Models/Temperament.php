<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Temperament extends Model
{
    use HasFactory;

    protected $table = 'temperaments';
    protected $primaryKey = 'temperament_id';
    public $timestamps = false;

    protected $fillable = ['name'];

    public function pets()
    {
        return $this->belongsToMany(Temperament::class, 'temperament_pet', 'pet_id', 'temperament_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Species extends Model
{
    use HasFactory;

    protected $table = 'species';
    protected $primaryKey = 'specie_id';
    public $timestamps = false;

    protected $fillable = ['name'];

    public function pets()
    {
        return $this->hasMany(Pet::class);
    }
}

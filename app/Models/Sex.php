<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sex extends Model
{
    use HasFactory;

    protected $table = 'sexes';
    protected $primaryKey = 'sex_id';
    public $timestamps = false;

    protected $fillable = ['name'];

    public function pets()
    {
        return $this->hasMany(Pet::class);
    }
}

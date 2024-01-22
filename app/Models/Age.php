<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Age extends Model
{
    use HasFactory;

    protected $table = 'ages';
    protected $primaryKey = 'age_id';
    public $timestamps = false;


    protected $fillable = ['name'];
    public function pets()
    {
        return $this->hasMany(Pet::class, 'age_id');
    }
}

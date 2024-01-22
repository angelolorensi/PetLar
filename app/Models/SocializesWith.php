<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocializesWith extends Model
{
    use HasFactory;

    protected $table = 'socializes_with';
    protected $primaryKey = 'socializes_with_id';
    public $timestamps = false;

    protected $fillable = ['name'];

    public function pets()
    {
        return $this->belongsToMany(SocializesWith::class, 'socializes_with_pet', 'pet_id', 'socializes_with_id');
    }
}

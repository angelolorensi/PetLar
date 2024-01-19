<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;
    protected $table = 'image';
    protected $primaryKey = 'image_id';
    protected $fillable = ['pet_id', 'image_path'];

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }
}

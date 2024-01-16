<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePetRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string',
            'species' => 'required|string|in:Canino,Felino',
            'sex' => 'required|string|in:Fêmea,Macho',
            'size' => 'required|string|in:Pequeno,Médio,Grande',
            'age' => 'required|string|in:Filhote,Adulto,Idoso',
            'neutered' => 'required|boolean',
            'vaccinated' => 'required|boolean',
            'dewormed' => 'required|boolean',
            'special_care' => 'required|boolean',
            'temperament' => 'required|string|in:Agressivo,Arisco,Brincalhão,Calmo,Carente,Dócil,Independente,Sociável',
            'living_environment' => 'required|string|in:Apartamento,Apartamento telado,Casa com quintal fechado',
            'socializes_with' => 'required|string|in:Cachorros,Gatos,Crianças,Pessoas desconhecidas',
            'description' => 'nullable|string',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:10000',
        ];
    }
}

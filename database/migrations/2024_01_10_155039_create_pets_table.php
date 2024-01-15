<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->enum('species', ['Canino', 'Felino']);
            $table->enum('sex', ['Fêmea', 'Macho']);
            $table->enum('size', ['Pequeno', 'Médio', 'Grande']);
            $table->enum('age', ['Filhote', 'Adulto', 'Idoso']);
            $table->boolean('neutered')->default(false);
            $table->boolean('vaccinated')->default(false);
            $table->boolean('dewormed')->default(false);
            $table->boolean('special_care')->default(false);
            $table->enum('temperament', ['Agressivo', 'Arisco', 'Brincalhão', 'Calmo', 'Carente', 'Dócil', 'Independente', 'Sociável']);
            $table->enum('living_environment', ['Apartamento', 'Apartamento telado', 'Casa com quintal fechado']);
            $table->enum('socializes_with', ['Cachorros', 'Gatos', 'Crianças', 'Pessoas desconhecidas']);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};

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
        Schema::create('pet', function (Blueprint $table) {
            $table->id('pet_id');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->foreignId('specie_id')->constrained('specie','species_id');
            $table->foreignId('sex_id')->constrained('sex','sex_id');
            $table->foreignId('size_id')->constrained('size', 'size_id');
            $table->foreignId('age_id')->constrained('age','age_id');
            $table->boolean('neutered')->default(0);
            $table->boolean('vaccinated')->default(0);
            $table->boolean('dewormed')->default(0);
            $table->boolean('special_care')->default(0);
            $table->foreignId('temperament_id')->constrained('temperament','temperament_id');
            $table->foreignId('living_environment_id')->constrained('living_environment','living_environment_id');
            $table->foreignId('socializes_with_id')->constrained('socializes_with','socializes_with_id');
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pet');
    }
};

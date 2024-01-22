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
        Schema::create('living_environment_pet', function (Blueprint $table) {
            $table->foreignId('living_environment_id')->constrained('living_environments', 'living_environment_id');
            $table->foreignId('pet_id')->constrained('pets','pet_id');
        });

        Schema::create('socializes_with_pet', function (Blueprint $table) {
            $table->foreignId('socializes_with_id')->constrained('socializes_with','socializes_with_id');
            $table->foreignId('pet_id')->constrained('pets','pet_id');
        });

        Schema::create('temperament_pet', function (Blueprint $table) {
            $table->foreignId('temperament_id')->constrained('temperaments','temperament_id');
            $table->foreignId('pet_id')->constrained('pets','pet_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('relation_tables');
    }
};

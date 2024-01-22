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
            $table->bigIncrements('pet_id');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('name');
            $table->foreignId('species_id')->constrained('species', 'specie_id');
            $table->foreignId('sex_id')->constrained('sexes', 'sex_id');
            $table->foreignId('size_id')->constrained('sizes','size_id');
            $table->foreignId('age_id')->constrained('ages','age_id');
            $table->boolean('neutered')->default(false);
            $table->boolean('vaccinated')->default(false);
            $table->boolean('dewormed')->default(false);
            $table->boolean('special_care')->default(false);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('pets');
    }
};

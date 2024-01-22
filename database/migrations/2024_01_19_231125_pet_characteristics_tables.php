<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('species', function (Blueprint $table) {
            $table->bigIncrements('specie_id');
            $table->string('name');
        });

        Schema::create('sexes', function (Blueprint $table) {
            $table->bigIncrements('sex_id');
            $table->string('name');
        });

        Schema::create('sizes', function (Blueprint $table) {
            $table->bigIncrements('size_id');
            $table->string('name');
        });

        Schema::create('ages', function (Blueprint $table) {
            $table->bigIncrements('age_id');
            $table->string('name');
        });

        Schema::create('temperaments', function (Blueprint $table) {
            $table->bigIncrements('temperament_id');
            $table->string('name');
        });

        Schema::create('living_environments', function (Blueprint $table) {
            $table->bigIncrements('living_environment_id');
            $table->string('name');
        });

        Schema::create('socializes_with', function (Blueprint $table) {
            $table->bigIncrements('socializes_with_id');
            $table->string('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('species');
        Schema::dropIfExists('sexes');
        Schema::dropIfExists('sizes');
        Schema::dropIfExists('ages');
        Schema::dropIfExists('temperaments');
        Schema::dropIfExists('living_environments');
        Schema::dropIfExists('socializes_with');
    }
};

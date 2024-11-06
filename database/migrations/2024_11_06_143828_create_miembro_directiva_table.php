<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('miembro_directiva', function (Blueprint $table) {
            $table->increments('id_miembro_directiva');
            $table->unsignedInteger('id_directiva');
            $table->unsignedInteger('id_vecino');
            $table->foreign('id_directiva')->references('id_directiva')->on('directiva')->onDelete('cascade');
            $table->foreign('id_vecino')->references('id_vecino')->on('vecino')->onDelete('cascade');
            $table->timestamps();
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('miembro_directiva');
    }
};

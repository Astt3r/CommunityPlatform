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
        Schema::create('vecino', function (Blueprint $table) {
            $table->increments('id_vecino');
            $table->string('nombre', 50);
            $table->string('direccion', 255);
            $table->string('telefono', 255);
            $table->string('email', 255);
            $table->string('rut', 255);
            $table->dateTime('fecha_de_registro');
            $table->dateTime('fecha_nacimiento');
            $table->string('estado', 50);
            $table->dateTime('fecha_de_ultima_participacion');
            $table->unsignedInteger('id_junta_de_vecino');
            $table->foreign('id_junta_de_vecino')->references('id_junta_de_vecino')->on('junta_de_vecino')->onDelete('cascade');
            $table->timestamps();
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vecino');
    }
};

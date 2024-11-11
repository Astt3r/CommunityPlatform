<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('junta_de_vecino', function (Blueprint $table) {
            $table->increments('id_junta_de_vecino');
            //id vs increments 4bit vs 8bit
            $table->string('nombre', 50);
            $table->string('direccion_sede', 255);
            $table->string('telefono_contacto', 255);
            $table->string('email_contacto', 255);
            $table->dateTime('fecha_fundacion');
            $table->string('estado', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('junta_de_vecino');
    }
};

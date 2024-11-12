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
            $table->string('nombre', 50);
            $table->string('direccion', 255); // Cambiado a direccion
            $table->string('telefono', 255); // Cambiado a telefono
            $table->string('email', 255); // Cambiado a email
            $table->date('fecha_fundacion'); // Mantener como date si no necesitas tiempo
            $table->string('estado', 50);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('junta_de_vecino');
    }
};

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
        Schema::create('reunions', function (Blueprint $table) {
            $table->id('id_reunion');
            $table->date('fecha_reunion');
            $table->string('tema_principal');
            $table->text('descripcion');
            $table->string('lugar');
            $table->string('convocada_por');
            $table->string('resultado')->nullable();
            $table->string('estado');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reunion');
    }
};

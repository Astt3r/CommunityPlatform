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
        Schema::create('projects', function (Blueprint $table) {
            $table->id('id_proyecto');
            $table->string('nombre');
            $table->string('descripcion');
            $table->text('problema');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->string('estado')->nullable();
            $table->string('responsable')->nullable();
            $table->string('presupuesto');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};

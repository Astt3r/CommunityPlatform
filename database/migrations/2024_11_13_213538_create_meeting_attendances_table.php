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
        Schema::create('meeting_attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('meeting_id')->constrained()->onDelete('cascade'); // Eliminar registros de asistencia al borrar la reunión
            $table->foreignId('neighbor_id')->constrained()->onDelete('cascade'); // También puedes querer borrar las asistencias si se elimina al vecino
            $table->tinyInteger('attended')->default(0);
            $table->string('absence_reason')->nullable();
            $table->timestamps();
        });
        
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meeting_attendances');
    }
};

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
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->string('issue');
            $table->boolean('is_for_all_neighbors')->default(false); // Elimina "after description"
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->enum('status', ['planeado', 'aprovado', 'en_proceso', 'completado', 'cancelado'])->default('planeado');
            $table->string('budget');
            $table->longText('changes');
            $table->foreignId('association_id')->constrained('neighborhood_associations')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('is_for_all_neighbors');
        });
    }



};

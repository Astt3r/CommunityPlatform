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
        Schema::create('neighbors', function (Blueprint $table) {
            $table->id();
            $table->string('address', 255);
            $table->string('identification_number', 50);
            $table->date('registration_date');
            $table->date('birth_date');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->date('last_participation_date')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('neighborhood_association_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('neighbors');
    }
};

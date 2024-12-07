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
        Schema::create('meetings', function (Blueprint $table) {
            $table->id();
            $table->dateTime('meeting_date');
            $table->string('main_topic', 100);
            $table->text('description')->nullable();
            $table->string('location', 255)->nullable();
            $table->string('organized_by', 100)->nullable();
            $table->string('result', 255)->nullable();
            $table->enum('status', ['scheduled', 'completed', 'canceled'])->default('scheduled');
            $table->foreignId('neighborhood_association_id')->constrained('neighborhood_associations')->onDelete('cascade'); // Required association
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meetings');
    }
};
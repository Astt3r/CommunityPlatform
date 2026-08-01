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
        Schema::create('meeting_vote_casts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('meeting_vote_id')->constrained('meeting_votes')->onDelete('cascade');
            $table->foreignId('meeting_vote_option_id')->constrained('meeting_vote_options')->onDelete('cascade');
            $table->foreignId('neighbor_id')->constrained('neighbors')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['meeting_vote_id', 'neighbor_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meeting_vote_casts');
    }
};

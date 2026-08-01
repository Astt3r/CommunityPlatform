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
        Schema::create('meeting_vote_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('meeting_vote_id')->constrained('meeting_votes')->onDelete('cascade');
            $table->string('label', 255);
            $table->unsignedTinyInteger('position')->default(0);
            $table->timestamps();

            $table->unique(['meeting_vote_id', 'label']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meeting_vote_options');
    }
};

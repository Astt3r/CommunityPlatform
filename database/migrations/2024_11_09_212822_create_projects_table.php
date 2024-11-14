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
            $table->id('project_id');
            $table->string('name');
            $table->string('description');
            $table->text('issue');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('status')->nullable();
            $table->string('responsible')->nullable();
            $table->string('budget');
            $table->foreignId('association_id')->constrained('neighborhood_associations')->onDelete('cascade');
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
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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->string('concept', 255);
            $table->string('responsible', 100);
            $table->timestamp('date');
            $table->integer('amount')->unsigned();
            $table->string('receipt', 255)->nullable();
            $table->enum('status', ['approved', 'pending', 'rejected'])->default('pending');
            $table->foreignId('type_id')->constrained('expense_types')->onDelete('cascade');
            $table->foreignId('association_id')->constrained('neighborhood_associations')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};

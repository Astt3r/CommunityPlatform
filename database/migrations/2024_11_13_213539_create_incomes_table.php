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
        Schema::create('incomes', function (Blueprint $table) {
            $table->id();
            $table->string('source', 255);
            $table->date('date');
            $table->string('responsible', 255);
            $table->decimal('amount', 10, 2);
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->foreignId('type_id')->constrained('income_types');
            $table->foreignId('association_id')->constrained('neighborhood_associations');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incomes');
    }

};

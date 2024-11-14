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
        Schema::create('residents', function (Blueprint $table) {
            $table->id();
            $table->string('address');
            $table->string('identification_number');
            $table->string('registration_date');
            $table->string('birth_date');
            $table->string('status');
            $table->date('last_participation_date');
            $table->foreignId('user_id')->constraiwned('users')->onDelete('cascade');
            $table->foreignId('neighborhood_association_id')->nullable()->constrained('neighborhood_associations')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('residents');
    }
};

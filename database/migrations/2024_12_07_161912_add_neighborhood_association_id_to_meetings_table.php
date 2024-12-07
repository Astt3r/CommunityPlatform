<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::table('meetings', function (Blueprint $table) {
            $table->foreignId('neighborhood_association_id')
                  ->nullable()
                  ->constrained('neighborhood_associations')
                  ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::table('meetings', function (Blueprint $table) {
            $table->dropForeign(['neighborhood_association_id']);
            $table->dropColumn('neighborhood_association_id');
        });
    }
};
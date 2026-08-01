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
        Schema::table('committee_members', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
            $table->foreignId('neighbor_id')->after('committee_id')->constrained('neighbors')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('committee_members', function (Blueprint $table) {
            $table->dropForeign(['neighbor_id']);
            $table->dropColumn('neighbor_id');
            $table->foreignId('user_id')->after('committee_id')->constrained('users')->onDelete('cascade');
        });
    }
};

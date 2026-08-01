<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE meetings MODIFY status ENUM('scheduled', 'in_progress', 'completed', 'canceled') NOT NULL DEFAULT 'scheduled'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('meetings')->where('status', 'in_progress')->update(['status' => 'scheduled']);

        DB::statement("ALTER TABLE meetings MODIFY status ENUM('scheduled', 'completed', 'canceled') NOT NULL DEFAULT 'scheduled'");
    }
};

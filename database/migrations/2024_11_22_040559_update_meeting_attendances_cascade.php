<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('meeting_attendances', function (Blueprint $table) {
            $table->dropForeign(['meeting_id']);
            $table->foreign('meeting_id')->references('id')->on('meetings')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('meeting_attendances', function (Blueprint $table) {
            $table->dropForeign(['meeting_id']);
            $table->foreign('meeting_id')->references('id')->on('meetings');
        });
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('zihanki', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->double('lat', 8,6);
            $table->double('lng',9,6);
            $table->varchar('image_type',64);
            $table->mediumblob('image_content');
            $table->int('image_size');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('zihanki');
    }
};

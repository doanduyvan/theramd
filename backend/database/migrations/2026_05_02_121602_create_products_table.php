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
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('id_sapo');
            $table->string('name');
            $table->string('alias')->nullable();
            $table->string('product_type')->nullable();
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->text('summary')->nullable();
            $table->longText('content')->nullable();
            $table->string('status')->nullable();
            $table->json('images')->nullable();
            $table->json('image')->nullable();
            $table->json('variants')->nullable();

            $table->timestamps();

            $table->index('id_sapo');
            $table->index('alias');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

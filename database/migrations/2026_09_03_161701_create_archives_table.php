<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('archives', function (Blueprint $table) {
            $table->id();

            $table->string('archive_number')->unique();
            $table->date('document_date');

            $table->string('subject');

            $table->string('sender')->nullable();
            $table->string('recipient')->nullable();

            $table->foreignId('archive_type_id')
                ->nullable()
                ->constrained('archive_types')
                ->nullOnDelete();

            $table->foreignId('category_id')
                ->nullable()
                ->constrained('categories')
                ->nullOnDelete();

            $table->foreignId('unit_id')
                ->nullable()
                ->constrained('units')
                ->nullOnDelete();

            $table->string('status')->default('uploaded');

            $table->text('description')->nullable();

            $table->foreignId('uploaded_by')
                ->constrained('users')
                ->restrictOnDelete();

            $table->timestamps();

            $table->index('archive_number');
            $table->index('document_date');
            $table->index('status');
            $table->index('archive_type_id');
            $table->index('category_id');
            $table->index('unit_id');
            $table->index('uploaded_by');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('archives');
    }
};

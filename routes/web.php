<?php

use App\Http\Controllers\ArchiveController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    /*
    |--------------------------------------------------------------------------
    | Archives
    |--------------------------------------------------------------------------
    */
    Route::prefix('archives')->name('archives.')->group(function () {

        /*
        |--------------------------------------------------------------------------
        | Create
        |--------------------------------------------------------------------------
        */
        Route::middleware('permission:archives.create')->group(function () {
            Route::get('create', [ArchiveController::class, 'create'])
                ->name('create');

            Route::post('/', [ArchiveController::class, 'store'])
                ->name('store');
        });

        /*
        |--------------------------------------------------------------------------
        | View / Read
        |--------------------------------------------------------------------------
        */
        Route::middleware('permission:archives.view')->group(function () {
            Route::get('/', [ArchiveController::class, 'index'])
                ->name('index');

            Route::get('{archive}', [ArchiveController::class, 'show'])
                ->name('show');
        });

        /*
        |--------------------------------------------------------------------------
        | Edit / Update
        |--------------------------------------------------------------------------
        */
        Route::middleware('permission:archives.edit')->group(function () {
            Route::get('{archive}/edit', [ArchiveController::class, 'edit'])
                ->name('edit');

            Route::put('{archive}', [ArchiveController::class, 'update'])
                ->name('update');
        });

        /*
        |--------------------------------------------------------------------------
        | Delete
        |--------------------------------------------------------------------------
        */
        Route::middleware('permission:archives.delete')->group(function () {
            Route::delete('{archive}', [ArchiveController::class, 'destroy'])
                ->name('destroy');
        });
    });
});

require __DIR__.'/settings.php';

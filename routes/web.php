<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReunionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/projects', function () {
        return Inertia::render('Project/ReadProject');
    })->name('projects');

    Route::get(uri: '/meeting', action: function () {
        return Inertia::render(component: 'Meeting/ReadMeeting');
    })->name(name: 'meeting');

    Route::get(uri: '/meeting/create', action: function () {
        return Inertia::render(component: 'Meeting/CreateMeeting');
    })->name(name: 'meeting.create');

    Route::get('/vecinos', function () {
        return Inertia::render('Vecinos');
    })->name('vecinos');

    Route::get('/projects/create', function () {
        return Inertia::render('Project/CreateProject');
    })->name('projects.create');
});

Route::get('/finanzas', function () {
    return Inertia::render('Finanzas');
})->name('finanzas');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/meetings', [ReunionController::class, 'index'])->name('meeting.index');
Route::get('/meetings/create', [ReunionController::class, 'create'])->name('meetings.create');
Route::post('/meetings', [ReunionController::class, 'store'])->name('meeting_store');


require __DIR__ . '/auth.php';

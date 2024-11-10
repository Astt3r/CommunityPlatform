<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ReunionController;
use App\Http\Controllers\DashboardController;
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



    Route::get('/project', function () {
        return Inertia::render('Project/ReadProject');
    })->name('project');

    Route::get(uri: '/project/create', action: function () {
        return Inertia::render(component: 'Project/CreateProject');
    })->name(name: 'project.create');



    Route::get(uri: '/meeting', action: function () {
        return Inertia::render(component: 'Meeting/ReadMeeting');
    })->name(name: 'meeting');

    Route::get(uri: '/meeting/create', action: function () {
        return Inertia::render(component: 'Meeting/CreateMeeting');
    })->name(name: 'meeting.create');



    Route::get('/vecinos', function () {
        return Inertia::render('Vecinos');
    })->name('vecinos');

    Route::get('/project/create', function () {
        return Inertia::render('Project/CreateProject');
    })->name('project.create');


    Route::get('/meetings', [ReunionController::class, 'index'])->name('meeting.index');
    Route::get('/meeting/create', function () {
        return Inertia::render('Meeting/CreateMeeting'); // Nombre exacto del archivo y carpeta
    })->name('meeting.create');
    Route::post('/meetings', [ReunionController::class, 'store'])->name('meeting.store');
    Route::get('/meetings/{id}/edit', [ReunionController::class, 'edit'])->name('meeting.edit');
    Route::put('/meetings/{id}', [ReunionController::class, 'update'])->name('meeting.update');
    Route::delete('/meetings/{id}', [ReunionController::class, 'destroy'])->name('meeting.destroy');


    Route::get('/projects', [ProjectController::class, 'index'])->name('project.index');
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('project.create');
    Route::post('/projects', [ProjectController::class, 'store'])->name('project.store');
    Route::get('/projects/{id}/edit', [ProjectController::class, 'edit'])->name('project.edit');
    Route::put('/projects/{id}', [ProjectController::class, 'update'])->name('project.update');
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy'])->name('project.destroy');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

});

Route::get('/finanzas', function () {
    return Inertia::render('Finanzas');
})->name('finanzas');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




require __DIR__ . '/auth.php';

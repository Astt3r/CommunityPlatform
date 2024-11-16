<?php

use App\Http\Controllers\CommitteeController;
use App\Http\Controllers\CommitteeMemberController;
use App\Http\Controllers\ContributionController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ExpenseTypeController;
use App\Http\Controllers\FeeController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\IncomeTypeController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\MeetingAttendanceController;
use App\Http\Controllers\MinutesController;
use App\Http\Controllers\NeighborController;
use App\Http\Controllers\NeighborhoodAssociationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Rutas públicas
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

// Rutas específicas de dashboard según el rol
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});
// Rutas autenticadas
Route::middleware('auth')->group(function () {
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
});

// Autenticación
require __DIR__ . '/auth.php';

//Rutas de ascociaciones nuevas
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('committees', CommitteeController::class);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('committee-members', CommitteeMemberController::class);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('contributions', ContributionController::class);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('expenses', ExpenseController::class);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('expense-types', ExpenseTypeController::class);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('fees', FeeController::class);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('incomes', IncomeController::class);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('income-types', IncomeTypeController::class);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('meetings', MeetingController::class);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('meeting-attendances', MeetingAttendanceController::class);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('minutes', MinutesController::class);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('neighbors', NeighborController::class);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('neighborhood-associations', NeighborhoodAssociationController::class);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('projects', ProjectController::class);
});




// Route::middleware(['auth', 'role:admin'])->group(function () {
//     Route::get('residents/create', [ResidentController::class, 'createResident'])->name('residents.create');
//     Route::resource('residents', ResidentController::class);
//     Route::post('/resident', [ResidentController::class, 'store'])->name('resident.store');
// });


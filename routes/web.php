<?php

use App\Exports\NeighborhoodAssociationsExport;
use App\Exports\ProjectsExport;
use App\Http\Controllers\CommitteeController;
use App\Http\Controllers\CommitteeMemberController;
use App\Http\Controllers\ContributionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ExpenseTypeController;
use App\Http\Controllers\FeeController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\IncomeTypeController;
use App\Http\Controllers\MeetingAttendanceController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\MinutesController;
use App\Http\Controllers\NeighborController;
use App\Http\Controllers\NeighborhoodAssociationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

// Rutas públicas
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
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

// Rutas de ascociaciones nuevas

// Neighborhood Associations
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('neighborhood-associations', NeighborhoodAssociationController::class);
});

// Neighbors
Route::middleware(['auth', 'role:admin,board_member,resident'])->group(function () {
    Route::resource('neighbors', NeighborController::class);
});
// Comittees
Route::middleware(['auth', 'role:admin,board_member'])->group(function () {
    Route::resource('committees', CommitteeController::class);
});


// Committee Members
Route::middleware(['auth', 'role:admin,board_member'])->group(function () {
    Route::resource('committee-members', CommitteeMemberController::class);
});

Route::middleware(['auth'])->group(function () {
    Route::post('/contributions', [ContributionController::class, 'store'])->name('contributions.store');
    Route::delete('/contributions/{id}', [ContributionController::class, 'destroy'])->name('contributions.destroy');

});



Route::middleware(['auth', 'role:admin,board_member,resident'])->group(function () {
    Route::resource('projects', ProjectController::class);
    Route::post('/projects/{project}/upload-file', [ProjectController::class, 'uploadFile'])->name('projects.uploadFile');
    Route::get('/projects/{project}/contributions', [ContributionController::class, 'indexByProject'])->name('projects.contributions');
    Route::get('/projects/{projectId}/neighbors', [ContributionController::class, 'neighborsByProject'])->name('projects.neighbors');
    Route::get('/projects/{projectId}/individual-contribution', [ContributionController::class, 'individualContribution'])->name('projects.individualContribution');
});


// Meetings
Route::middleware(['auth', 'role:admin,board_member,resident'])->group(function () {
    Route::resource('meetings', MeetingController::class)->only(['index', 'show']); // Restricción para Resident
    Route::resource('minutes', MinutesController::class);
    Route::resource('meetings', MeetingController::class);
});

// MeetingsAttendance
Route::middleware(['auth', 'role:admin,board_member'])->group(function () {
    Route::resource('meeting-attendances', MeetingAttendanceController::class);
    Route::get('/meetings/{meeting}/generate-pdf', [MinutesController::class, 'generatePdf'])->middleware('role:admin,board_member');
    Route::get('/meetings/{meeting}/attendance', [MeetingAttendanceController::class, 'showAttendance'])->name('meetings.attendance');
    Route::post('/meetings/{meeting}/attendance', [MeetingAttendanceController::class, 'storeAttendance'])->name('meetings.attendance.store');
    Route::get('/meetings/{meeting}/attendance-summary', [MeetingAttendanceController::class, 'showSummary'])->name('meetings.attendance.summary');

});


// Finance
Route::middleware(['auth', 'role:admin,board_member,resident'])->group(function () {
    Route::get('finance', function () {
        return Inertia::render('Finance/Index'); // Renderiza la vista central de Finanzas
    })->name('finance.index');

    Route::resource('expenses', ExpenseController::class);
    Route::resource('expense-types', ExpenseTypeController::class);
    Route::resource('incomes', IncomeController::class);
    Route::resource('income-types', IncomeTypeController::class);
});

// Export functions
Route::get('/export-neighborhoods', function (Request $request) {
    $filter = $request->only('latest');
    return Excel::download(new NeighborhoodAssociationsExport($filter), 'neighborhood_associations.xlsx');
});

Route::get('/export-projects', function (Request $request) {
    $filter = $request->only('latest'); // Captura el filtro "latest"
    return Excel::download(new ProjectsExport($filter), 'projects.xlsx');
});
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
use App\Exports\ProjectsExport;
use App\Http\Controllers\Project\ProjectDashboardController;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;

use App\Exports\NeighborhoodAssociationsExport;

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
Route::middleware(['auth', 'role:admin,board_member'])->group(function () {
    Route::resource('committees', CommitteeController::class);
});

Route::middleware(['auth', 'role:admin,board_member'])->group(function () {
    Route::resource('committee-members', CommitteeMemberController::class);
});

Route::middleware(['auth', 'role:admin,resident'])->group(function () {
    Route::resource('contributions', ContributionController::class);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('expenses', ExpenseController::class);
});

// Route::middleware(['auth', 'role:admin'])->group(function () {
//     Route::resource('expense-types', ExpenseTypeController::class);
// });

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('fees', FeeController::class);
});

Route::middleware(['auth', 'role:admin,board_member'])->group(function () {
    Route::get('finance', function () {
        return Inertia::render('Finance/Index'); // Renderiza la vista central de Finanzas
    })->name('finance.index');

    Route::resource('expenses', ExpenseController::class);
    Route::resource('expense-types', ExpenseTypeController::class);
    Route::resource('incomes', IncomeController::class);
    Route::resource('income-types', IncomeTypeController::class);
});


// Route::middleware(['auth', 'role:admin'])->group(function () {
//     Route::resource('income-types', IncomeTypeController::class);
// });

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('meetings', MeetingController::class);
    Route::get('/meetings/{meeting}/generate-pdf', [MinutesController::class, 'generatePdf']);
    Route::get('/meetings/{meeting}/attendance', [MeetingAttendanceController::class, 'showAttendance'])->name('meetings.attendance');
    Route::post('/meetings/{meeting}/attendance', [MeetingAttendanceController::class, 'storeAttendance'])->name('meetings.attendance.store');
    Route::get('/meetings/{meeting}/attendance-summary', [MeetingAttendanceController::class, 'showSummary'])
        ->name('meetings.attendance.summary');
    Route::get('/meetings/{meeting}', [MeetingController::class, 'show'])->name('meetings.show');




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

Route::middleware(['auth', 'role:admin,board_member,resident'])->group(function () {
    Route::get('/projects/{project}/contributions', [ContributionController::class, 'indexByProject'])->name('projects.contributions');
});


Route::middleware(['auth', 'role:admin,board_member,resident'])->group(function () {
    Route::resource('projects', ProjectController::class);
    Route::post('/projects/{project}/upload-file', [ProjectController::class, 'uploadFile'])->name('projects.uploadFile');

});


Route::get('/export-neighborhoods', function (Request $request) {
    $filter = $request->only('latest');
    return Excel::download(new NeighborhoodAssociationsExport($filter), 'neighborhood_associations.xlsx');
});

Route::get('/export-projects', function (Request $request) {
    $filter = $request->only('latest'); // Captura el filtro "latest"
    return Excel::download(new ProjectsExport($filter), 'projects.xlsx');
});





// Route::middleware(['auth', 'role:admin'])->group(function () {
//     Route::get('residents/create', [ResidentController::class, 'createResident'])->name('residents.create');
//     Route::resource('residents', ResidentController::class);
//     Route::post('/resident', [ResidentController::class, 'store'])->name('resident.store');
// });


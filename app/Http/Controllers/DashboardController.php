<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use App\Models\Project;
use App\Models\Reunion;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Obtener las últimas tres reuniones y proyectos
        $reunions = Reunion::latest()->take(3)->get();
        $projects = Project::latest()->take(3)->get();

        // Pasar los datos a la vista de Inertia
        return Inertia::render('Dashboard', [
            'reunions' => $reunions,
            'projects' => $projects,
        ]);
    }
}

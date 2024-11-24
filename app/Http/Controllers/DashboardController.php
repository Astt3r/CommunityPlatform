<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use App\Models\Project;
use App\Models\Reunion;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $meetings = Meeting::latest()->take(10)->get();
        $projects = Project::latest()->take(10)->get();

        // Datos para gráficos
        $meetingsData = $meetings->groupBy(fn($item) => $item->created_at->format('F'))
            ->map(fn($group) => $group->count())
            ->toArray();

        $projectsData = $projects->groupBy(fn($item) => $item->created_at->format('F'))
            ->map(fn($group) => [
                'completed' => $group->where('status', 'completed')->count(),
                'inProgress' => $group->where('status', 'in_progress')->count(),
            ])
            ->toArray();

        return Inertia::render('Dashboard', [
            'meetings' => $meetings,
            'projects' => $projects,
            'meetingsData' => $meetingsData,
            'projectsData' => $projectsData,
        ]);
    }



    // public function admin()
    // {
    //     return Inertia::render('AdminDashboard', [
    //         'user' => Auth::user(),
    //         'buttons' => ['Crear Asociación', 'Ver Reportes'],
    //         // Otros datos específicos para el rol de admin
    //     ]);
    // }

    // public function boardMember()
    // {
    //     return Inertia::render('BoardMemberDashboard', [
    //         'user' => Auth::user(),
    //         'buttons' => ['Ver Proyectos', 'Solicitar Reunión'],
    //         // Otros datos específicos para el rol de board_member
    //     ]);
    // }

    // public function neighbor()
    // {
    //     return Inertia::render('NeighborDashboard', [
    //         'user' => Auth::user(),
    //         'buttons' => ['Ver Beneficios', 'Enviar Sugerencia'],
    //         // Otros datos específicos para el rol de vecino
    //     ]);
    // }
}

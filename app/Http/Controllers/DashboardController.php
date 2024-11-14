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
        // // Obtener las últimas tres reuniones y proyectos
        // $reunions = Reunion::latest()->take(3)->get();
        // $projects = Project::latest()->take(3)->get();

        // // Pasar los datos a la vista de Inertia
        // return Inertia::render('Dashboard', [
        //     'reunions' => $reunions,
        //     'projects' => $projects,
        // ]);

        $user = Auth::user();
        $dashboardData = [
            // 'reunions' => Reunion::latest()->take(3)->get(),
            'projects' => Project::latest()->take(3)->get(),
        ];

        return Inertia::render('Dashboard');
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

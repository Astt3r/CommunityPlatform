<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use App\Models\Project;
use App\Models\Reunion;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\Neighbor;
use App\Models\CommitteeMember;
use App\Models\NeighborhoodAssociation;




class DashboardController extends Controller
{
    public function index()
    {
        $meetings = Meeting::latest()->take(10)->get();
        $projects = Project::latest()->take(10)->get();
        $neighbors = Neighbor::count();
        $boardMembers = CommitteeMember::count();
        $associations = NeighborhoodAssociation::count();

        return Inertia::render('Dashboard', [
            'meetings' => $meetings,
            'projects' => $projects,
            'neighbors' => $neighbors,
            'boardMembers' => $boardMembers,
            'associations' => $associations,
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

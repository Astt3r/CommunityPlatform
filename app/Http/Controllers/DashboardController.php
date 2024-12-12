<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\CommitteeMember;
use App\Models\Expense;
use App\Models\Income;
use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $role = $user->role;

        // Totales de ingresos y gastos
        $totalIncome = Income::sum('amount');
        $totalExpense = Expense::sum('amount');
        $balanceStatus = $totalIncome > $totalExpense ? 'Superávit' : 'Déficit';

        // Reuniones próximas
        $upcomingMeetings = Meeting::select('id', 'meeting_date as date', 'location', 'status')
            ->where('meeting_date', '>=', now())
            ->orderBy('meeting_date', 'asc')
            ->get()
            ->map(function ($meeting) {
                $meeting->date = $meeting->date ? Carbon::parse($meeting->date)->format('Y-m-d\TH:i:s') : null;
                return $meeting;
            });

        // Distribución de reuniones por estado
        $meetingDistribution = Meeting::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get();

        // Estado de proyectos
        $projectStates = Project::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get();

        // Proyectos activos
        $activeProjects = Project::where('status', 'en proceso')
            ->select('name', 'start_date', 'end_date', 'budget')
            ->get();

        // Fetch data based on the user's role
        if ($role === 'admin') {
            $meetings = Meeting::latest()->take(10)->get();
            $projects = Project::latest()->take(10)->get();
            $neighbors = Neighbor::count();
            $boardMembers = CommitteeMember::count();
            $associations = NeighborhoodAssociation::count();
        } else {
            $userAssociations = $user->association()->pluck('id');

            $meetings = Meeting::whereIn('neighborhood_association_id', $userAssociations)
                ->latest()
                ->take(10)
                ->get();
            $projects = Project::whereIn('neighborhood_association_id', $userAssociations)
                ->latest()
                ->take(10)
                ->get();
            $neighbors = Neighbor::whereIn('neighborhood_association_id', $userAssociations)->count();
            $boardMembers = CommitteeMember::whereIn('neighborhood_association_id', $userAssociations)->count();
            $associations = $userAssociations->count();
        }

        return Inertia::render('Dashboard', [
            'role' => $role,
            'meetings' => $meetings,
            'projects' => $projects,
            'neighbors' => $neighbors,
            'boardMembers' => $boardMembers,
            'associations' => $associations,
            'totalIncome' => $totalIncome,
            'totalExpense' => $totalExpense,
            'balanceStatus' => $balanceStatus,
            'upcomingMeetings' => $upcomingMeetings,
            'meetingDistribution' => $meetingDistribution,
            'projectStates' => $projectStates,
            'activeProjects' => $activeProjects,
        ]);
    }
}
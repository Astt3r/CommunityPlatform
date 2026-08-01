<?php

namespace App\Http\Controllers;

use App\Models\CommitteeMember;
use App\Models\Expense;
use App\Models\Income;
use App\Models\Meeting;
use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use App\Models\Project;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $role = $user->role;

        $userAssociations = collect(); // Initialize as an empty collection as default

        // Totales de ingresos y gastos
        $totalIncome = Income::sum('amount');
        $totalExpense = Expense::sum('amount');
        $balanceStatus = $totalIncome > $totalExpense ? 'Superávit' : 'Déficit';

        // Fetch data based on user's role
        if ($role === 'admin') {
            $meetings = Meeting::latest()->take(10)->get();
            $projects = Project::latest()->take(10)->get();
            $neighbors = Neighbor::count();
            $boardMembers = CommitteeMember::count();
            $associations = NeighborhoodAssociation::count();
        } else {
            // Handle case where user might not have a neighbor record
            if ($association = $user->currentAssociation()) {
                $userAssociations = collect([$association->id]);
            } else {
                // If user doesn't have neighbor record, fall back to associations they created
                $userAssociations = NeighborhoodAssociation::where('created_by', $user->id)->pluck('id');
            }

            $meetings = Meeting::whereIn('neighborhood_association_id', $userAssociations)
                ->latest()
                ->take(10)
                ->get();
            $projects = Project::whereIn('association_id', $userAssociations)
                ->latest()
                ->take(10)
                ->get();
            $neighbors = Neighbor::whereIn('neighborhood_association_id', $userAssociations)->count();
            $associations = $userAssociations->count();
        }

        // Reuniones próximas
        $upcomingMeetings = Meeting::select('id', 'meeting_date as date', 'location', 'status')
            ->where('meeting_date', '>=', now())
            ->when($role !== 'admin', function ($query) use ($userAssociations) {
                $query->whereIn('neighborhood_association_id', $userAssociations);
            })
            ->orderBy('meeting_date', 'asc')
            ->get()
            ->map(function ($meeting) {
                $meeting->date = $meeting->date ? Carbon::parse($meeting->date)->format('Y-m-d\TH:i:s') : null;

                return $meeting;
            });

        // Distribución de reuniones por estado
        $meetingDistribution = Meeting::selectRaw('status, COUNT(*) as count')
            ->when($role !== 'admin', function ($query) use ($userAssociations) {
                $query->whereIn('neighborhood_association_id', $userAssociations);
            })
            ->groupBy('status')
            ->get();

        // Estado de proyectos
        $projectStates = Project::selectRaw('status, COUNT(*) as count')
            ->when($role !== 'admin', function ($query) use ($userAssociations) {
                $query->whereIn('association_id', $userAssociations);
            })
            ->groupBy('status')
            ->get();

        // Proyectos activos
        $activeProjects = Project::where('status', 'en proceso')
            ->when($role !== 'admin', function ($query) use ($userAssociations) {
                $query->whereIn('association_id', $userAssociations);
            })
            ->select('name', 'start_date', 'end_date', 'budget')
            ->get();

        return Inertia::render('Dashboard', [
            'role' => $role,
            'meetings' => $meetings,
            'projects' => $projects,
            'neighbors' => $neighbors,
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

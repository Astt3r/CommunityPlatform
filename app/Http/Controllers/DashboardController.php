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
use App\Models\Expense;
use App\Models\NeighborhoodAssociation;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $role = $user->role;

        // Fetch data based on the user's role
        if ($role === 'admin') {
            // Admin can see all data
            $meetings = Meeting::latest()->take(10)->get();
            $projects = Project::latest()->take(10)->get();
            $neighbors = Neighbor::count();
            $boardMembers = CommitteeMember::count();
            $associations = NeighborhoodAssociation::count();
            $totalexpense = Expense::sum('amount');
        } else {
            // Non-admin users: Scope data to their association or involvement
            $userAssociations = $user->association()->pluck('id');

            $meetings = Meeting::whereIn('association_id', $userAssociations)->latest()->take(10)->get();
            $projects = Project::whereIn('association_id', $userAssociations)->latest()->take(10)->get();
            $neighbors = Neighbor::whereIn('association_id', $userAssociations)->count();
            $boardMembers = CommitteeMember::whereIn('association_id', $userAssociations)->count();
            $associations = $userAssociations->count();
            $totalexpense = Expense::sum('amount');

        }

        return Inertia::render('Dashboard', [
            'role' => $role,
            'meetings' => $meetings,
            'projects' => $projects,
            'neighbors' => $neighbors,
            'boardMembers' => $boardMembers,
            'associations' => $associations,
            'total' => $totalexpense,
        ]);
    }
}

<?php

namespace App\Providers;

use App\Models\Committee;
use App\Models\CommitteeMember;
use App\Models\Expense;
use App\Models\Income;
use App\Models\Meeting;
use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use App\Models\Project;
use App\Policies\CommitteeMemberPolicy;
use App\Policies\CommitteePolicy;
use App\Policies\ExpensePolicy;
use App\Policies\IncomePolicy;
use App\Policies\MeetingPolicy;
use App\Policies\NeighborhoodAssociationPolicy;
use App\Policies\NeighborPolicy;
use App\Policies\ProjectPolicy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Prefetch Vite assets for better performance
        Vite::prefetch(concurrency: 3);

        Gate::policy(NeighborhoodAssociation::class, NeighborhoodAssociationPolicy::class);
        Gate::policy(Neighbor::class, NeighborPolicy::class);
        Gate::policy(Project::class, ProjectPolicy::class);
        Gate::policy(Meeting::class, MeetingPolicy::class);
        Gate::policy(Expense::class, ExpensePolicy::class);
        Gate::policy(Income::class, IncomePolicy::class);
        Gate::policy(Committee::class, CommitteePolicy::class);
        Gate::policy(CommitteeMember::class, CommitteeMemberPolicy::class);

        // Share navigation links globally via Inertia
        Inertia::share([
            'navLinks' => function () {
                $user = Auth::user();

                // Si el usuario no está autenticado, devuelve una lista vacía
                if (! $user) {
                    return [];
                }

                // Devuelve una lista de enlaces de navegación basado en el rol del usuario
                return match ($user->role) {
                    'admin' => [
                        ['name' => 'Dashboard', 'route' => 'dashboard'],
                        ['name' => 'Juntas', 'route' => 'neighborhood-associations.index'],
                        ['name' => 'Vecinos', 'route' => 'neighbors.index'],
                        // ['name' => 'Directivas', 'route' => 'committee-members.index'],
                        // ['name' => 'Proyectos', 'route' => 'projects.index'],
                        // ['name' => 'Reuniones', 'route' => 'meetings.index'],
                        // ['name' => 'Finanzas', 'route' => 'finance.index'],
                    ],
                    'board_member' => [
                        ['name' => 'Dashboard', 'route' => 'dashboard'],
                        ['name' => 'Vecinos', 'route' => 'neighbors.index'],
                        // ['name' => 'Directivas', 'route' => 'committee-members.index'],
                        ['name' => 'Proyectos', 'route' => 'projects.index'],
                        ['name' => 'Reuniones', 'route' => 'meetings.index'],
                        ['name' => 'Finanzas', 'route' => 'finance.index'],

                    ],
                    'resident' => [
                        ['name' => 'Dashboard', 'route' => 'dashboard'],
                        ['name' => 'Vecinos', 'route' => 'neighbors.index'],
                        ['name' => 'Proyectos', 'route' => 'projects.index'],
                        ['name' => 'Reuniones', 'route' => 'meetings.index'],
                        ['name' => 'Finanzas', 'route' => 'finance.index'],

                    ],
                    default => [],
                };
            },
        ]);

    }
}

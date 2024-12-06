<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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

        // Share navigation links globally via Inertia
        Inertia::share([
            'navLinks' => function () {
                $user = Auth::user();

                // Si el usuario no está autenticado, devuelve una lista vacía
                if (!$user) {
                    return [];
                }

                // Devuelve una lista de enlaces de navegación basado en el rol del usuario
                return match ($user->role) {
                    'admin' => [
                        ['name' => 'Dashboard', 'route' => 'dashboard'],
                        ['name' => 'Juntas', 'route' => 'neighborhood-associations.index'],
                        ['name' => 'Vecinos', 'route' => 'neighbors.index'],
                        ['name' => 'Directivas', 'route' => 'committee-members.index'],
                        ['name' => 'Proyectos', 'route' => 'projects.index'],
                        ['name' => 'Reuniones', 'route' => 'meetings.index'],
                        ['name' => 'Finanzas', 'route' => 'finance.index'],
                    ],
                    'board_member' => [
                        ['name' => 'Vecinos', 'route' => 'neighbors.index'],
                        ['name' => 'Directivas', 'route' => 'committee-members.index'],
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

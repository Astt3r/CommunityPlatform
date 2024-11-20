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

                if (!$user) {
                    return [];
                }

                return match ($user->role) {
                    'admin' => [
                        ['name' => 'Dashboard', 'route' => 'dashboard'],
                        ['name' => 'Juntas', 'route' => 'neighborhood-associations.index'],
                        ['name' => 'Vecinos', 'route' => 'neighbors.index'],
                        ['name' => 'Directivas', 'route' => 'committee-members.index'],
                        ['name' => 'Proyectos', 'route' => 'projects.index'],
                        ['name' => 'Reuniones', 'route' => 'meetings.index'],
                        ['name' => 'Finanzas', 'route' => 'finance.index'], // Actualizado para redirigir a Finanzas
                    ],
                    'board_member' => [
                        ['name' => 'Finanzas', 'route' => 'finance.index'],
                    ],
                    'resident' => [
                        ['name' => 'Dashboard', 'route' => 'dashboard'],
                    ],
                    default => [],
                };
            },
        ]);

    }
}

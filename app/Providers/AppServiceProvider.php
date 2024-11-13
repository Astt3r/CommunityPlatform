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
        Vite::prefetch(concurrency: 3);
        Inertia::share([
            'navLinks' => function () {
                $user = Auth::user();

                if (!$user) {
                    return [];
                }

                switch ($user->role) {
                    case 'admin':
                        return [
                            ['name' => 'Dashboard', 'route' => 'dashboard'],
                            ['name' => 'Junta de Vecinos', 'route' => 'neighborhood-associations.index'],
                        ];
                    case 'board_member':
                        return [

                        ];
                    case 'resident':
                        return [
                            ['name' => 'Dashboard', 'route' => 'dashboard'],
                            ['name' => 'Junta de Vecinos', 'route' => 'neighborhood-associations.index'],
                        ];
                    default:
                        return [];
                }
            },
        ]);
    }
}

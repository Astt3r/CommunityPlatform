<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        // Inicializa las variables
        $neighbor = null;
        $neighborhoodAssociation = null;

        if ($user) {
            // Verifica si el usuario tiene un vecino asociado y su asociación de vecinos
            $neighbor = $user->neighbor;
            $neighborhoodAssociation = $neighbor ? $neighbor->neighborhoodAssociation : null;
        }

        return [
            ...parent::share($request),

            // Información del usuario autenticado
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ] : null,
                'neighborhood_association' => $neighborhoodAssociation ? [
                    'id' => $neighborhoodAssociation->id,
                    'name' => $neighborhoodAssociation->name,
                ] : null,
            ],

            // Flash messages
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
        ];
    }
}

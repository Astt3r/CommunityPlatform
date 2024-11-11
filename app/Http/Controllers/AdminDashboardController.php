<?php

namespace App\Http\Controllers;

use App\Models\JuntaDeVecino;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render("Admin/Dashboard");
    }

    public function createJuntaDeVecino()
    {
        return Inertia::render("Admin/CreateJuntaDeVecino");
    }

    public function storeJuntaDeVecino(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'direccion' => 'required|string|max:255',
            'telefono' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'fecha_fundacion' => 'required|date',
            'estado' => 'required|string|max:255',
        ]);

        JuntaDeVecino::create($request->all());

        return redirect()->route('admin.dashboard')->with('success', 'Junta de Vecino creada exitosamente.');

    }
}

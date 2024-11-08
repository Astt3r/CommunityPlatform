<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Reunion; // Asegúrate de que esta línea esté presente




class ReunionController extends Controller
{
    public function index()
    {
        $meetings = Reunion::all();
        return Inertia::render('Meeting/ReadMeeting', ['meetings' => $meetings]);
    }


    public function create()
    {
        return Inertia::render('createMeeting');
    }

    public function store(Request $request)
    {
        $request->validate([
            'fecha_reunion' => 'required|date',
            'tema_principal' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'lugar' => 'required|string|max:255',
            'convocada_por' => 'required|string|max:255',
            'estado' => 'required|string|max:255',
        ]);

        // Crea la reunión
        Reunion::create($request->all());

        // Redirige a la lista de reuniones después de crear una
        return redirect()->route('meeting.index')->with('success', 'Reunión creada exitosamente.');
    }
}

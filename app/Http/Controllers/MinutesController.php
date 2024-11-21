<?php

namespace App\Http\Controllers;

use App\Models\Minutes;
use Illuminate\Http\Request;

class MinutesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    public function generatePdf($meetingId)
    {
        // Obtener la reunión según su ID
        $meeting = Meeting::findOrFail($meetingId);

        // Cargar la vista de acta de reunión y pasarle los datos
        $pdf = Pdf::loadView('minutes.template', compact('meeting'));

        // Descargar el PDF
        return $pdf->download('Acta_Reunion_' . $meeting->main_topic . '.pdf');
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Minutes $minutes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Minutes $minutes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Minutes $minutes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Minutes $minutes)
    {
        //
    }
}

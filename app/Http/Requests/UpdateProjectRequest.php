<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para hacer esta solicitud.
     */
    public function authorize()
    {
        return true; // Cambiar según tus políticas de autorización
    }

    /**
     * Define las reglas de validación.
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'issue' => 'nullable|string|max:1000',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'nullable|string|max:100',
            'responsible' => 'nullable|string|max:255',
            'budget' => 'nullable|numeric|min:0',
            'file' => 'nullable|file|mimes:pdf,doc,docx,jpg,png|max:20480',
        ];
    }

    /**
     * Personalizar mensajes de error (opcional).
     */
    public function messages()
    {
        return [
            'name.required' => 'El nombre del proyecto es obligatorio.',
            'name.max' => 'El nombre del proyecto no puede exceder los 255 caracteres.',
            'end_date.after_or_equal' => 'La fecha de finalización debe ser igual o posterior a la fecha de inicio.',
            'file.mimes' => 'El archivo debe ser un tipo válido: pdf, doc, docx, jpg, png.',
            'file.max' => 'El archivo no debe superar los 20 MB.',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MeetingRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para hacer esta solicitud.
     */
    public function authorize(): bool
    {
        // Cambiar a `true` si deseas permitir acceso a esta solicitud
        return true;
    }

    /**
     * Obtén las reglas de validación que se aplican a la solicitud.
     */
    public function rules(): array
    {
        return [
            'meeting_date' => 'required|date|after_or_equal:' . now()->subWeek()->toDateString(),
            'main_topic' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'location' => 'required|string|max:255',
            'result' => 'nullable|string|max:1000',
            'status' => 'required|in:scheduled,completed,canceled',
        ];
    }


    /**
     * Mensajes personalizados para las reglas de validación.
     */
    public function messages(): array
    {
        return [
            'meeting_date.required' => 'La fecha de la reunión es obligatoria.',
            'meeting_date.date' => 'La fecha de la reunión debe ser válida.',
            'meeting_date.after_or_equal' => 'La fecha de la reunión no puede ser anterior a hace una semana.',
            'main_topic.required' => 'El tema principal de la reunión es obligatorio.',
            'main_topic.string' => 'El tema principal debe ser un texto válido.',
            'main_topic.max' => 'El tema principal no puede exceder los 255 caracteres.',
            'description.string' => 'La descripción debe ser un texto válido.',
            'description.max' => 'La descripción no puede exceder los 1000 caracteres.',
            'location.required' => 'El lugar de la reunión es obligatorio.',
            'location.string' => 'El lugar debe ser un texto válido.',
            'location.max' => 'El lugar no puede exceder los 255 caracteres.',
            'result.string' => 'El resultado debe ser un texto válido.',
            'result.max' => 'El resultado no puede exceder los 1000 caracteres.',
            'status.required' => 'El estado de la reunión es obligatorio.',
            'status.in' => 'El estado debe ser uno de los siguientes: programada, completada o cancelada.',
        ];
    }

}

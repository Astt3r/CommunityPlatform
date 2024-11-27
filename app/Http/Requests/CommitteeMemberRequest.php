<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommitteeMemberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true; // Cambia si necesitas control de acceso
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules()
    {
        return [
            'committee_id' => 'required|exists:committees,id',
            'user_id' => 'required|exists:users,id',
            'status' => 'required|in:active,inactive',
            'joined_date' => 'required|date',
            'left_date' => 'nullable|date|after_or_equal:joined_date',
        ];
    }

    /**
     * Custom error messages.
     */
    public function messages()
    {
        return [
            'committee_id.required' => 'El comité es obligatorio.',
            'committee_id.exists' => 'El comité seleccionado no es válido.',
            'user_id.required' => 'El usuario es obligatorio.',
            'user_id.exists' => 'El usuario seleccionado no es válido.',
            'status.required' => 'El estado es obligatorio.',
            'status.in' => 'El estado debe ser "active" o "inactive".',
            'joined_date.required' => 'La fecha de ingreso es obligatoria.',
            'joined_date.date' => 'La fecha de ingreso debe ser una fecha válida.',
            'left_date.date' => 'La fecha de salida debe ser una fecha válida.',
            'left_date.after_or_equal' => 'La fecha de salida debe ser igual o posterior a la fecha de ingreso.',
        ];
    }
}

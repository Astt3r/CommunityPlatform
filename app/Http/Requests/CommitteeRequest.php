<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommitteeRequest extends FormRequest
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
            'name' => 'required|string|max:50',
            'description' => 'required|string|max:255',
            'code' => 'nullable|string|max:20|unique:committees',
            'type' => 'required|in:president,treasurer,secretary',
            'status' => 'required|in:active,inactive',
            'effective_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:effective_date',
            'parent_committee_id' => 'nullable|exists:committees,id',
        ];
    }

    /**
     * Custom error messages.
     */
    public function messages()
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.max' => 'El nombre no debe exceder los 50 caracteres.',
            'description.required' => 'La descripción es obligatoria.',
            'description.max' => 'La descripción no debe exceder los 255 caracteres.',
            'code.max' => 'El código no debe exceder los 20 caracteres.',
            'code.unique' => 'El código ya está en uso.',
            'type.required' => 'El tipo es obligatorio.',
            'type.in' => 'El tipo debe ser "president", "treasurer" o "secretary".',
            'status.required' => 'El estado es obligatorio.',
            'status.in' => 'El estado debe ser "active" o "inactive".',
            'effective_date.date' => 'La fecha de inicio debe ser una fecha válida.',
            'end_date.date' => 'La fecha de fin debe ser una fecha válida.',
            'end_date.after_or_equal' => 'La fecha de fin debe ser igual o posterior a la fecha de inicio.',
            'parent_committee_id.exists' => 'El comité padre seleccionado no es válido.',
        ];
    }
}

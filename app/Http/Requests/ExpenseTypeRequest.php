<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExpenseTypeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true; // Cambiar si necesitas control de acceso
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:50',
            'description' => 'nullable|string|max:255',
            'code' => 'required|string|max:20|unique:expense_types,code',
            'status' => 'required|in:active,inactive',
            'effective_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:effective_date',
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
            'description.max' => 'La descripción no debe exceder los 255 caracteres.',
            'code.required' => 'El código es obligatorio.',
            'code.max' => 'El código no debe exceder los 20 caracteres.',
            'code.unique' => 'El código ya está en uso.',
            'status.required' => 'El estado es obligatorio.',
            'status.in' => 'El estado debe ser "active" o "inactive".',
            'effective_date.date' => 'La fecha de inicio debe ser una fecha válida.',
            'end_date.date' => 'La fecha de fin debe ser una fecha válida.',
            'end_date.after_or_equal' => 'La fecha de fin debe ser igual o posterior a la fecha de inicio.',
        ];
    }
}

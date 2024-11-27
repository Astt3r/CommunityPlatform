<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IncomeRequest extends FormRequest
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
            'source' => 'required|string|max:255',
            'responsible' => 'required|string|max:100',
            'date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'type_id' => 'required|exists:income_types,id',
            'status' => 'required|in:active,inactive',
        ];
    }

    /**
     * Custom error messages.
     */
    public function messages()
    {
        return [
            'source.required' => 'La fuente es obligatoria.',
            'source.max' => 'La fuente no debe exceder los 255 caracteres.',
            'responsible.required' => 'El responsable es obligatorio.',
            'responsible.max' => 'El responsable no debe exceder los 100 caracteres.',
            'date.required' => 'La fecha es obligatoria.',
            'date.date' => 'La fecha debe ser una fecha válida.',
            'amount.required' => 'El monto es obligatorio.',
            'amount.numeric' => 'El monto debe ser un número.',
            'amount.min' => 'El monto debe ser igual o mayor a 0.',
            'type_id.required' => 'El tipo de ingreso es obligatorio.',
            'type_id.exists' => 'El tipo de ingreso seleccionado no es válido.',
            'status.required' => 'El estado es obligatorio.',
            'status.in' => 'El estado debe ser "active" o "inactive".',
        ];
    }
}

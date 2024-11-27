<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExpenseRequest extends FormRequest
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
            'concept' => 'required|string|max:255|regex:/^[a-zA-Z\s]+$/', // Solo letras y espacios
            'responsible' => 'required|string|max:100|regex:/^[a-zA-Z\s]+$/', // Solo letras y espacios
            'date' => 'required|date',
            'amount' => 'required|numeric|min:0', // Solo números
            'type_id' => 'required|exists:expense_types,id',
            'receipt' => 'nullable|file|mimes:jpg,png,pdf|max:2048', // Ajusta los tipos de archivo según sea necesario
            'status' => 'required|in:approved,pending,rejected',
        ];
    }

    /**
     * Custom error messages.
     */
    public function messages()
    {
        return [
            'concept.required' => 'El concepto es obligatorio.',
            'concept.string' => 'El concepto debe ser texto.',
            'concept.max' => 'El concepto no debe exceder los 255 caracteres.',
            'concept.regex' => 'El concepto solo puede contener letras y espacios.',
            'responsible.required' => 'El responsable es obligatorio.',
            'responsible.string' => 'El responsable debe ser texto.',
            'responsible.max' => 'El responsable no debe exceder los 100 caracteres.',
            'responsible.regex' => 'El responsable solo puede contener letras y espacios.',
            'date.required' => 'La fecha es obligatoria.',
            'date.date' => 'La fecha debe ser válida.',
            'amount.required' => 'El monto es obligatorio.',
            'amount.numeric' => 'El monto debe ser un número.',
            'amount.min' => 'El monto debe ser mayor o igual a 0.',
            'type_id.required' => 'El tipo de gasto es obligatorio.',
            'type_id.exists' => 'El tipo de gasto seleccionado no es válido.',
            'receipt.file' => 'El recibo debe ser un archivo válido.',
            'receipt.mimes' => 'El recibo debe ser un archivo de tipo: jpg, png, pdf.',
            'receipt.max' => 'El recibo no debe exceder los 2 MB.',
            'status.required' => 'El estado es obligatorio.',
            'status.in' => 'El estado debe ser "approved", "pending" o "rejected".',
        ];
    }
}

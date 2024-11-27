<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NeighborRequest extends FormRequest
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
            'user_id' => 'nullable|unique:neighbors,user_id',
            'address' => 'required|string|max:255',
            'identification_number' => 'required|string|max:50',
            'registration_date' => 'required|date',
            'birth_date' => 'required|date',
            'status' => 'required|in:active,inactive',
            'last_participation_date' => 'nullable|date',
            'neighborhood_association_id' => 'required|exists:neighborhood_associations,id',
        ];
    }

    /**
     * Custom error messages.
     */
    public function messages()
    {
        return [
            'user_id.unique' => 'El usuario ya está asignado a otro vecino.',
            'address.required' => 'La dirección es obligatoria.',
            'address.max' => 'La dirección no debe exceder los 255 caracteres.',
            'identification_number.required' => 'El número de identificación es obligatorio.',
            'identification_number.max' => 'El número de identificación no debe exceder los 50 caracteres.',
            'registration_date.required' => 'La fecha de registro es obligatoria.',
            'registration_date.date' => 'La fecha de registro debe ser una fecha válida.',
            'birth_date.required' => 'La fecha de nacimiento es obligatoria.',
            'birth_date.date' => 'La fecha de nacimiento debe ser una fecha válida.',
            'status.required' => 'El estado es obligatorio.',
            'status.in' => 'El estado debe ser "activo" o "inactivo".',
            'last_participation_date.date' => 'La fecha de última participación debe ser una fecha válida.',
            'neighborhood_association_id.required' => 'La asociación vecinal es obligatoria.',
            'neighborhood_association_id.exists' => 'La asociación vecinal seleccionada no es válida.',
        ];
    }
}

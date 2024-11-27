<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NeighborhoodAssociationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true; // Cambiar según las políticas de autorización
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255|unique:neighborhood_associations,name',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'email' => 'required|email|max:255',
            'website_url' => 'nullable|url|max:255',
            // 'number_of_members' => 'required|integer|min:0',
            'date_of_funding' => 'required|date|before_or_equal:today',
            'is_active' => 'required|boolean',
        ];
    }

    /**
     * Get custom messages for validation errors.
     */
    public function messages()
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.unique' => 'Ya existe una junta de vecinos con este nombre. Por favor, elige otro.',
            'address.required' => 'La dirección es obligatoria.',
            'phone.required' => 'El teléfono es obligatorio.',
            'phone.max' => 'El teléfono no debe tener más de 15 caracteres.',
            'email.required' => 'El email es obligatorio.',
            'email.email' => 'El email debe ser una dirección válida.',
            'website_url.url' => 'La URL del sitio web debe ser válida.',
            // 'number_of_members.required' => 'El número de miembros es obligatorio.',
            // 'number_of_members.integer' => 'El número de miembros debe ser un número entero.',
            // 'number_of_members.min' => 'El número de miembros no puede ser negativo.',
            'date_of_funding.required' => 'La fecha de fundación es obligatoria.',
            'date_of_funding.date' => 'La fecha de fundación debe ser una fecha válida.',
            'date_of_funding.before_or_equal' => 'La fecha de fundación no puede ser en el futuro.',
            'is_active.required' => 'Debe indicar si la asociación está activa.',
            'is_active.boolean' => 'El estado debe ser verdadero o falso.',
        ];
    }
}

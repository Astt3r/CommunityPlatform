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
        $neighborId = $this->route('neighbor')?->id; // Para permitir la edición sin duplicados

        return [
            'user_id' => 'nullable|unique:neighbors,user_id,' . $neighborId, // Cada usuario debe ser único como vecino
            'address' => 'required|regex:/^[\pL\pN\s,.-]+$/u|max:255|unique:neighbors,address,' . $neighborId, // Dirección única
            'identification_number' => [
                'required',
                'regex:/^[a-zA-Z0-9.-]+$/',
                'max:50',
                'unique:neighbors,identification_number,' . $neighborId, // Único para nuevos y actualizaciones
                function ($attribute, $value, $fail) {
                    if (!$this->isValidRUT($value)) {
                        $fail('El RUT ingresado no tiene un formato válido.');
                    }
                },
            ],
            'registration_date' => 'required|date|before_or_equal:today', // Fecha de registro válida y no futura
            'birth_date' => 'required|date|before:today', // Fecha de nacimiento válida y anterior a hoy
            'status' => 'required|in:active,inactive', // Solo "active" o "inactive"
            'last_participation_date' => 'nullable|date|after_or_equal:registration_date', // Fecha posterior o igual a la de registro
            'neighborhood_association_id' => 'required|exists:neighborhood_associations,id', // Asociación vecinal válida
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
            'address.regex' => 'La dirección solo puede contener letras, números, espacios, comas y puntos.',
            'address.unique' => 'Esta dirección ya está registrada. Por favor, ingrese otra.',
            'address.max' => 'La dirección no debe exceder los 255 caracteres.',
            'identification_number.required' => 'El número de identificación es obligatorio.',
            'identification_number.regex' => 'El número de identificación solo puede contener letras, números, puntos y guiones.',
            'identification_number.unique' => 'Este número de identificación ya está registrado.',
            'identification_number.max' => 'El número de identificación no debe exceder los 50 caracteres.',
            'registration_date.required' => 'La fecha de registro es obligatoria.',
            'registration_date.date' => 'La fecha de registro debe ser una fecha válida.',
            'registration_date.before_or_equal' => 'La fecha de registro no puede ser posterior a hoy.',
            'birth_date.required' => 'La fecha de nacimiento es obligatoria.',
            'birth_date.date' => 'La fecha de nacimiento debe ser una fecha válida.',
            'birth_date.before' => 'La fecha de nacimiento debe ser anterior a hoy.',
            'status.required' => 'El estado es obligatorio.',
            'status.in' => 'El estado debe ser "activo" o "inactivo".',
            'last_participation_date.date' => 'La fecha de última participación debe ser una fecha válida.',
            'last_participation_date.after_or_equal' => 'La fecha de última participación debe ser igual o posterior a la fecha de registro.',
            'neighborhood_association_id.required' => 'La asociación vecinal es obligatoria.',
            'neighborhood_association_id.exists' => 'La asociación vecinal seleccionada no es válida.',
        ];
    }

    /**
     * Validar el formato del RUT.
     */
    private function isValidRUT($rut)
    {
        $rut = preg_replace('/[^k0-9]/i', '', $rut);
        $dv = substr($rut, -1);
        $numero = substr($rut, 0, strlen($rut) - 1);
        $i = 2;
        $suma = 0;
        foreach (array_reverse(str_split($numero)) as $v) {
            if ($i == 8) {
                $i = 2;
            }
            $suma += $v * $i;
            ++$i;
        }
        $dvr = 11 - ($suma % 11);
        if ($dvr == 11) {
            $dvr = 0;
        }
        if ($dvr == 10) {
            $dvr = 'K';
        }
        return (string) $dvr === strtoupper($dv);
    }
}

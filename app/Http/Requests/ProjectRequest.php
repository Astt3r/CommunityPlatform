<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'issue' => 'required|string|max:1000',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'required|string|in:planeado,aprovado,en_proceso,completado,cancelado',
            'budget' => 'required|numeric|min:0',
            'file' => 'nullable|file|mimes:pdf,doc,docx,jpg,png|max:20480',
            'is_for_all_neighbors' => 'required|boolean',
            'neighbor_ids' => 'nullable|array',
            'neighbor_ids.*' => 'exists:neighbors,id',

        ];
    }





    public function messages()
    {
        return [
            'file.max' => 'El archivo no debe superar los 20 MB.',
            'name.required' => 'Por favor, ingresa el nombre del proyecto.',
            'name.string' => 'El nombre del proyecto debe ser texto.',
            'name.max' => 'El nombre del proyecto no puede tener más de 255 caracteres.',
            'name.unique' => 'Ya existe un proyecto con este nombre. Elige otro.',
            'description.required' => 'La descripción del proyecto es obligatoria.',
            'description.max' => 'La descripción no puede tener más de 500 caracteres.',
            'issue.required' => 'Describe el problema que aborda este proyecto.',
            'issue.max' => 'El problema no puede exceder los 1000 caracteres.',
            'start_date.required' => 'La fecha de inicio es obligatoria.',
            'start_date.date' => 'La fecha de inicio debe ser una fecha válida.',
            'end_date.required' => 'La fecha de finalización es obligatoria.',
            'end_date.date' => 'La fecha de finalización debe ser una fecha válida.',
            'end_date.after_or_equal' => 'La fecha de finalización debe ser igual o posterior a la fecha de inicio.',
            'status.required' => 'Especifica el estado del proyecto.',
            'status.string' => 'El estado debe ser una cadena de texto.',
            'budget.required' => 'El presupuesto es obligatorio.',
            'budget.numeric' => 'El presupuesto debe ser un número.',
            'budget.min' => 'El presupuesto no puede ser negativo.',
            'file.file' => 'El archivo debe ser un documento válido.',
            'file.mimes' => 'El archivo debe ser de tipo: pdf, doc, docx, jpg o png.',
            'file.max' => 'El archivo no puede superar los 2 MB.',
        ];
    }


}

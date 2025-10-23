<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskStoreInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // público
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string|max:1000',
            'status' => 'sometimes|required|in:pendiente,completada',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'El título es obligatorio',
            'title.max' => 'El título no puede exceder 255 caracteres',
            'description.max' => 'La descripción no puede exceder 1000 caracteres',
            'status.required' => 'El estado es obligatorio',
            'status.in' => 'El estado debe ser "pendiente" o "completada"',
        ];
    }
}
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\RejectUnknownFields;

class TaskStoreRequest extends FormRequest
{
    use RejectUnknownFields;

    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $this->rejectUnknownFields(['title', 'description', 'prioridad', 'status']);
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'prioridad' => 'string|in:baja,media,alta',
            'description' => 'nullable|string|max:1000',
            'status' => 'required|in:pendiente,completada',
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
            'prioridad.in' => 'La prioridad debe ser baja, media o alta',
        ];
    }
}
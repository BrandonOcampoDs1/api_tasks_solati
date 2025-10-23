<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\RejectUnknownFields;

class TaskUpdateRequest extends FormRequest
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
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string|max:1000',
            'prioridad' => 'sometimes|in:baja,media,alta',
            'status' => 'sometimes|in:pendiente,completada',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'El título es obligatorio cuando es enviado',
            'title.max' => 'El título no puede exceder 255 caracteres',
            'description.max' => 'La descripción no puede exceder 1000 caracteres',
            'status.in' => 'El estado debe ser "pendiente" o "completada"',
            'prioridad.in' => 'La prioridad debe ser baja, media o alta',
        ];
    }
}

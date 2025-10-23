<?php

namespace App\Traits;

use Illuminate\Validation\ValidationException;

trait RejectUnknownFields
{
    protected function rejectUnknownFields(array $allowed)
    {
        $ignored = ['_token', '_method', 'api_client'];

        $inputKeys = array_keys($this->getInputSource()->all());

        $filtered = array_diff($inputKeys, $ignored);

        $unknown = array_diff($filtered, $allowed);

        if (!empty($unknown)) {
            throw ValidationException::withMessages([
                'unknown_fields' => ['Campos no permitidos enviados: ' . implode(', ', $unknown)]
            ]);
        }
    }
}

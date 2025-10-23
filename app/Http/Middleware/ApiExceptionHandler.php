<?php

namespace App\Http\Middleware;

use Closure;
use Throwable;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use Illuminate\Database\QueryException;

class ApiExceptionHandler
{
    use ApiResponse;

    public function handle(Request $request, Closure $next)
    {
        try {
            return $next($request);
        } catch (ValidationException $e) {
            $errors = $e->errors();
            return $this->errorResponse('Error de validación', $errors, 422);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Recurso no encontrado', null, 404);
        } catch (AuthenticationException $e) {
            return $this->errorResponse('No autenticado', null, 401);
        } catch (QueryException $e) {
            $msg = app()->environment('production') ? 'Error en la base de datos' : $e->getMessage();
            return $this->errorResponse($msg, null, 500);
        } catch (Throwable $e) {
            $msg = app()->environment('production') ? 'Error interno del servidor' : $e->getMessage();
            $errors = app()->environment('production') ? null : [
                'exception' => get_class($e),
                'trace' => $e->getTrace(),
            ];
            return $this->errorResponse($msg, $errors, 500);
        }
    }
}
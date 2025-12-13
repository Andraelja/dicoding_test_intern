<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Auth\AuthenticationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        // Handle unauthenticated API requests (token tidak ada / salah)
        $this->renderable(function (AuthenticationException $e, $request) {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Token tidak valid atau tidak ada',
                ], 401);
            }
        });

        // Handle ModelNotFoundException
        $this->renderable(function (ModelNotFoundException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                ], 404);
            }
        });

        // Handle NotFoundHttpException (Route not found)
        $this->renderable(function (NotFoundHttpException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Endpoint tidak ditemukan',
                ], 404);
            }
        });

        // Handle ValidationException
        $this->renderable(function (ValidationException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $e->errors(),
                ], 422);
            }
        });

        // Handle generic exceptions
        $this->renderable(function (Throwable $e, $request) {
            if ($request->is('api/*') && !($e instanceof ValidationException)) {
                return response()->json([
                    'success' => false,
                    'message' => config('app.debug') 
                        ? $e->getMessage() 
                        : 'Terjadi kesalahan server',
                ], 500);
            }
        });
    }
}
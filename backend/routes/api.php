<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\VacancyController;
use App\Http\Controllers\Api\PositionController;

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::prefix('vacancies')->group(function () {
    Route::get('/', [VacancyController::class, 'index']);
    Route::get('/search', [VacancyController::class, 'search']);
    Route::get('/{id}', [VacancyController::class, 'show']);

    Route::middleware(['auth:sanctum', 'role:Admin'])->group(function () {
        Route::post('/', [VacancyController::class, 'store']);
        Route::put('/{id}', [VacancyController::class, 'update']);
        Route::delete('/{id}', [VacancyController::class, 'destroy']);
    });
});


Route::prefix('positions')
->middleware(['auth:sanctum', 'role:Admin'])
->group(function () {
    Route::get('/', [PositionController::class, 'index']);
});
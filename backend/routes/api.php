<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\VacancyController;

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);

Route::prefix('vacancies')
->middleware(['auth:sanctum', 'role:Admin'])
->group(function () {
    Route::get('/', [VacancyController::class, 'index']);
    Route::get('{id}', [VacancyController::class, 'show']);
    Route::post('/', [VacancyController::class, 'store']);
    Route::put('/{id}', [VacancyController::class, 'update']);
    Route::delete('/{id}', [VacancyController::class, 'destroy']);
});
<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('pets', [PetController::class, 'index']);
    Route::get('pets/{pet}', [PetController::class, 'show']);
    Route::post('pets', [PetController::class, 'store']);
    Route::post('pets/{pet}', [PetController::class, 'update']); 
    Route::delete('pets/{pet}', [PetController::class, 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
});


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) { 
    return $request->user();
});
Route::resource('tareas/consultar', 'App\Http\Controllers\ApiTareasController')->names('api.tareas');
Route::resource('tareas/crear', 'App\Http\Controllers\ApiTareasController')->names('api.tareas');
Route::resource('tareas/borrar', 'App\Http\Controllers\ApiTareasController')->names('api.tareas');
Route::resource('tareas/actualizar', 'App\Http\Controllers\ApiTareasController')->names('api.tareas');
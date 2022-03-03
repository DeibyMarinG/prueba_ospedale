<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();
Route::middleware('auth')->resource('tareas/consultar_web', 'App\Http\Controllers\ApiTareasController')->names('tareas');
Route::middleware('auth')->resource('tareas/crear_web', 'App\Http\Controllers\ApiTareasController')->names('api.tareas');
Route::middleware('auth')->resource('tareas/borrar_web', 'App\Http\Controllers\ApiTareasController')->names('api.tareas');
Route::middleware('auth')->resource('tareas/actualizar_web', 'App\Http\Controllers\ApiTareasController')->names('api.tareas');
Route::middleware('auth')->get('token', 'App\Http\Controllers\ApiTareasController@crearToken');
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::middleware('auth')->resource('perfil','App\Http\Controllers\Usuarios')->names('api.usuarios');
Route::middleware('auth')->get('/perfiles', function () {
    return view('perfiles');
});

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tareas;
use Illuminate\Support\Facades\Auth;

class ApiTareasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Tareas::orderBy('fecha_final','desc')-> get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $datos =new Tareas();
        //estado en 0 sin terminar y 1 es terminado
        $datos->nombre =$request->nombre;
        $datos->descripcion =$request->descripcion;
        $datos->fecha_inicio =$request->fecha_inicio;
        $datos->fecha_final =$request->fecha_final;
        $datos->user_id =Auth::id();
        $datos->estado = 0;
        $datos->save();
        echo $datos;
        return 'Datos Guardados correctamente';
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $datos =new Tareas();
        //estado en 0 sin terminar y 1 es terminado
        $datos->nombre =$request->nombre;
        $datos->descripcion =$request->descripcion;
        $datos->fecha_inicio =$request->fecha_inicio;
        $datos->fecha_final =$request->fecha_final;
        $datos->user_id =Auth::id();
        $datos->estado = $request->estado;
        $datos->save();
        echo $datos;
        return 'Datos Guardados correctamente';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tarea = Tareas::find( $id );
        $tarea->delete();
    }
}

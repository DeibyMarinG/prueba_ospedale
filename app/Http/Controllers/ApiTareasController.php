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
    

    public function index(Request $request)
    {
        
        $consulta = new Tareas;
        if(($request->header('estado')!=NULL)&&($request->header('estado')!=-1)){
            $consulta=$consulta->where('estado',$request->header('estado'));
        }
        if($request->header('user_id')!=NULL){ 
            if($request->header('user_id')==-1){
                $consulta=$consulta->where('user_id',Auth::id());
            }
            else if ($request->header('user_id')!=-2){ //-2 significa que entra a todos 
                $consulta=$consulta->where('user_id',$request->header('user_id'));
            }
           
        }
        
            return $consulta->orderBy('fecha_final','desc')-> get();
    }
    public function crearToken(Request $request){
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;
        return($token);
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
        if($request->estado!=NULL){
            $datos->estado=$request->estado;
        }
        else{
            $datos->estado = 0;
        }
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
        $datos = Tareas::find($request->id);
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

@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-info">{{ __('Gestion de tareas') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                  <form id="myform "@submit.prevent="getFormValues">
                    <div class="card-body">
                      <div>
                        <input type="radio" id="mostrar_todas" name="drone" 
                               >
                        <label for="mostrar_todas">Tareas de todos los usuarios</label>
                      </div>
                      
                      <div>
                        <input type="radio" id="no_mostrar_todas" name="drone"  checked>
                        <label for="no_mostrar_todas">Tareas propias </label>
                      </div>
                    </div>
                    <div class="card-body">
                      <div>
                        <input type="radio" id="mostrar_finalizadas"  name="drone2"
                               >
                        <label for="mostrar_finalizadas">Tareas completadas</label>
                      </div>
                      
                      <div>
                        <input type="radio" id="mostrar_sin_finalizar"  name="drone2" >
                        <label for="mostrar_sin_finalizar">Tareas sin finalizar</label>
                      </div>

                      <div>
                        <input type="radio" id="mostrar_sin_estado"  name="drone2" checked>
                        <label for="mostrar_sin_estado">Tareas sin importar estado</label>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary float-start">Ejecutar</button>
                  </form>
                    
                    
                    <button type="button" class="btn btn-primary float-end" @click="nuevaTarea()">Nuevo</button>
                    
                    <table class="table table">
                        <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Nombre</th>
                              <th scope="col">Descripción</th>
                              <th scope="col">Fecha inicio</th>
                              <th scope="col">Fecha final</th>
                              <th scope="col">Estado</th>
                              <th scope="col">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="tarea in tareas">
                              <th scope="row">@{{tarea.id}}</th>
                              <td>@{{tarea.nombre}}</td>
                              <td>@{{tarea.descripcion}}</td>
                              <td>@{{tarea.fecha_inicio}}</td>
                              <td>@{{tarea.fecha_final}}</td>
                              <td class="table-danger" v-if="tarea.estado==0"></td>
                              <td class="table-success" v-else></td>
                              <td>
                              <button type="button" class="btn btn-outline-info"  @click="editarTarea(tarea)">Editar</button>
                              <button type="button" class="btn btn-outline-danger" @click="eliminarTarea(tarea)">Eliminar</button>
                              </td>
                            </tr>
                          </tbody>
                      </table>
                
                </div>
            </div>
        </div>
        </div>
</div>
@endsection

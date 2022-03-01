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

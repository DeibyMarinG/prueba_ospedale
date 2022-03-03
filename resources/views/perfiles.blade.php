@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-info">{{ __('Gestion de usuarios') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <table class="table table">
                      <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo Electronico</th>
                            <th scope="col">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="usuario  in usuarios">
                            <th scope="row">@{{usuario.id}}</th>
                            <td>@{{usuario.name}}</td>
                            <td>@{{usuario.email}}</td>
                            <td>
                            <button type="button" class="btn btn-outline-primary"  @click="cambiarPassword(usuario)">Cambiar contraseña</button>
                            <button type="button" class="btn btn-outline-secondary"  @click="cambiarDatosUsuarios(usuario)">Cambiar datos</button>
                            <button type="button" class="btn btn-outline-danger"  @click="eliminarUsuario(usuario)">Eliminar</button>
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

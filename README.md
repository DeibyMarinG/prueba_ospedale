<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>



## Sistema de Gestión de tareas

El sistema fue desarrollado con el fin de probar los conocimientos del programador en frameworks como Laravel y VUE.

El sistema contiene un gestor de autenticación el cual permite crear y loggear usuarios, una vez loggeado, este usuario puede consultar, crear, editar y eliminar Tareas. También puede cambiar los datos de registro como nombre, email o contraseña. Adicional puede generar un BEARER Token el cual le permite usar las rutas de la API.
## Arranque del sistema

El sistema fue desarrollado en laravel 9, con PHP 8.1.2, EL paquete XAMP provee lo necesario para hacer funcionar este sistema como una base de datos MySQL, servidor Apache y PHP. Adicional se empleó Composer 2.2.7 y node 16.14.0, todo corriendo en un sistema windows.

## Hacer funcionar el sistema

Para hacer funcionar el sistema se deben ejecutar los siguientes comandos una vez instaladas las dependencias.

- npm run dev 
- php artisan db:seed
- php artisan migrate


## Rutas API

Las rutas api son:

Consultar: http://localhost:8000/tareas/consultar/id

Crear: http://localhost:8000/tareas/crear

Eliminar:http://localhost:8000/tareas/borrar/id

Actualizar: http://localhost:8000/tareas/actualizar/id

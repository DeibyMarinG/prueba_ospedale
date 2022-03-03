/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;
window.moment = require('moment');
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


 var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      tareas: [],
      usuarios:[],
      picked:[]
    },
    methods:{
        getFormValues (submitEvent) {
            this.picked[0] = submitEvent.target.elements.mostrar_todas.checked;
            if(submitEvent.target.elements.mostrar_finalizadas.checked){
                this.picked[1]=1;
            }
            else if(submitEvent.target.elements.mostrar_sin_finalizar.checked){
                this.picked[1]=2;
            }
            else{
                this.picked[1]=3;
            }
            this.getTareas();
            //console.log(this.picked)
          },
        getTareas(){
            let estado;
            let user_id;
            if(this.picked.length==0){
                user_id=-1;
                estado=-1;
            }
            if(this.picked[0]==false){
                    user_id=-1;
            }
            else if(this.picked[0]==true){
                user_id=-2;
            }

            if((this.picked[1]==1)){
                estado=1; //solo altos 
            }
            else if((this.picked[1]==2)){
                estado=0;
            }
            else{
                estado=-1; //muestra todos
            }
            let url = '/tareas/consultar_web';
            axios.get(url,{
                headers: {
                  'user_id': user_id,
                  'estado': estado
                }
              }).then(response=>{
                console.log(response.data)
                this.tareas=response.data;
            })
        },
        getTodasTareas(){
            
            let url = '/tareas/consultar_web';
            
            axios.get(url).then(response=>{
                console.log(response.data)
                this.tareas=response.data;
            })
        },
        nuevaTarea(){
            console.log("nuevo dato");

                Swal.mixin({
                    
                    confirmButtonText: 'Next &rarr;',
                    showCancelButton: true,
                    progressSteps: ['1', '2', '3']
                }).queue(
                    [
                    {
                        input: 'text',
                        title: 'Nombre',
                        text: 'Nombre de la tarea',
                        inputValidator: (value) => {
                            if(!value){
                                return 'Debes dar un nombre a la tarea'
                            }
                        }
                        
                    },
                    {
                        input: 'text',
                        title: 'Descripción',
                        text: 'Descripción de la tarea',
                        
                    },
                    {
                        title: 'Fecha de inicio y final',
                        html: '<input id="swal-input1" type="datetime-local" class="swal2-input"><input id="swal-input2" type="datetime-local" class="swal2-input">',
                        inputValidator: () => {
                            console.log("inputvalidador");
                            let inicial = document.getElementById('swal-input1').value;
                            let final = document.getElementById('swal-input2').value;
                            console.log(inicial);
                            console.log(final);
                            if(inicial!="" | final!=""){
                                return 'Debes ingresar fecha de inicio y final'
                            }
                        },
                        
                        preConfirm: () =>{
                            let inicial = document.getElementById('swal-input1').value;
                            let final = document.getElementById('swal-input2').value;
                            if(inicial=="" | final==""){
                                toastr["error"]("Debes ingresar fecha inicial y fecha final", "Error")
                                toastr.options = {
                                "closeButton": false,
                                "debug": false,
                                "newestOnTop": false,
                                "progressBar": false,
                                "positionClass": "toast-top-right",
                                "preventDuplicates": true,
                                "onclick": null,
                                "showDuration": "300",
                                "hideDuration": "1000",
                                "timeOut": "5000",
                                "extendedTimeOut": "1000",
                                "showEasing": "swing",
                                "hideEasing": "linear",
                                "showMethod": "fadeIn",
                                "hideMethod": "fadeOut"
                                }
                                return false
                            }
                            else if(final<inicial){
                                toastr["error"]("Fecha final debe ser mayor a la inicial", "Error")
                                toastr.options = {
                                "closeButton": false,
                                "debug": false,
                                "newestOnTop": false,
                                "progressBar": false,
                                "positionClass": "toast-top-right",
                                "preventDuplicates": true,
                                "onclick": null,
                                "showDuration": "300",
                                "hideDuration": "1000",
                                "timeOut": "5000",
                                "extendedTimeOut": "1000",
                                "showEasing": "swing",
                                "hideEasing": "linear",
                                "showMethod": "fadeIn",
                                "hideMethod": "fadeOut"
                                }
                                return false
                            }
                            else{
                                return[ document.getElementById('swal-input1').value,document.getElementById('swal-input2').value]
                            }
                            
                        }
                           
                    },
                ]).then(async (result) => {
                    if (result.value) {
                        const tarea_entregar={
                            nombre:result.value[0],
                            descripcion:result.value[1],
                            fecha_inicio:result.value[2][0],
                            fecha_final:result.value[2][1]
                        }
                        console.log(tarea_entregar);
                        const answers = JSON.stringify(result.value);
                        let url = '/tareas/crear_web';
                        await axios.post(url,tarea_entregar).then(response=>{
                            console.log(response.data);
                            this.mensaje=response.data;
                        })
                        this.getTareas();
                        Swal.fire({
                            
                            icon: 'success',
                            title: 'Creado satisfactorio',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
        },
        eliminarTarea(tarea){
            console.log(tarea)
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })
              
              swalWithBootstrapButtons.fire({
                title: '¿Estás seguro?',
                html: "Se eliminará la tarea <strong>"+tarea.nombre+"</strong><br> No se podrá revertir",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'No, cancelar!',
                confirmButtonColor:'#00DD00',
                cancelButtonColor:'#DD0000',
                reverseButtons: true
              }).then(async (result) => {
                if (result.isConfirmed) {
                    let url ='/tareas/borrar_web/'+tarea.id
                    await axios.delete(url).then(response=>{
                        console.log(response.data)
                        this.mensaje=response.data;
                    });
                    this.getTareas();
                    Swal.fire({
                            
                        icon: 'success',
                        title: 'La tarea ha sido eliminada',
                        showConfirmButton: false,
                        timer: 1500
                      })
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                    Swal.fire({
                            
                        icon: 'error',
                        title: 'La tarea no se ha eliminado',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
              })
        },
        editarTarea(tarea){
            const { value: formValues } =  Swal.fire({
                title: 'Editar Tarea',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Guardar',
                html:
                  '<h2>Nombre<h2>'+
                  '<input id="swal-input1" value="'+
                  tarea.nombre+
                  '" class="swal2-input">' +
                  '<h2>Descripcion<h2>'+
                  '<input id="swal-input2" value="'+
                 tarea.descripcion+
                  '" class="swal2-input">'+
                  '<h2>Fecha inicial<h2>'+
                  '<input id="swal-input3" type="datetime-local" value="'+
                  moment(String(tarea.fecha_inicio)).format('YYYY-MM-DDThh:mm')+
                  '" class="swal2-input">' +
                  '<h2>Fecha final<h2>'+
                  '<input id="swal-input4" type="datetime-local" value="'+
                  moment(String(tarea.fecha_final)).format('YYYY-MM-DDThh:mm')+
                  '" class="swal2-input">' +
                  '<h2>Estado de la tarea<h2>'+
                  '<select class="swal2-select" id="swal-input5" style="display: flex;">'+
                  '<option value="" disabled="">Selecciona un estado</option>'+
                  '<option value=1>Terminado</option><option value=0>Sin terminar</option></select>',
                focusConfirm: false,
                preConfirm: () => {
                    let inicial = document.getElementById('swal-input3').value;
                    let final = document.getElementById('swal-input4').value;
                    let nombre = document.getElementById('swal-input1').value;
                    if(inicial=="" | final==""){
                        toastr["error"]("Debes ingresar fecha inicial y fecha final", "Error")
                        toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": true,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                        }
                        return false
                    }
                    else if(final<inicial){
                        toastr["error"]("Fecha final debe ser mayor a la inicial", "Error")
                        toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": true,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                        }
                        return false
                    }
                    else if (nombre==""){
                        toastr["error"]("Nombre no debe ser vacío", "Error")
                        toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": true,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                        }
                        return false
                    }
                    else{
                        return[ document.getElementById('swal-input1').value,document.getElementById('swal-input2').value,document.getElementById('swal-input3').value,document.getElementById('swal-input4').value,document.getElementById('swal-input5').value]
                    }
                    
                }
              }).then(async(result) => {
                if (result.value) {
                    const tarea_entregar={
                        id:tarea.id,
                        nombre:result.value[0],
                        descripcion:result.value[1],
                        fecha_inicio:result.value[2],
                        fecha_final:result.value[3],
                        estado:result.value[4],
                    }
                    console.log(tarea_entregar);
                    const answers = JSON.stringify(result.value);
                    let url = '/tareas/actualizar_web/'+tarea.id;
                    await axios.put(url,tarea_entregar).then(response=>{
                        console.log(response.data);
                        this.mensaje=response.data;
                    })
                    this.getTareas();
                    Swal.fire({
                        
                        icon: 'success',
                        title: 'Editado satisfactorio',
                        showConfirmButton: false,
                        timer: 1400
                      })
                }
            })
              
             
        },
        crearToken(){
            let url = '/token';
            axios.get(url).then(response=>{
                console.log(response.data);
                Swal.fire(
                    'Tu nuevo Bearer token es:',
                    response.data,
                    'info'
                  )
            })
            
        },
        getUsuarios(){
            let url = '/perfil';
            axios.get(url).then(response=>{
                console.log(response.data);
                this.usuarios=response.data;
            })
        },
        cambiarPassword(usuario){
            const { value: password } = Swal.fire({
                title: 'Enter your password',
                input: 'password',
                inputLabel: 'Password',
                inputPlaceholder: 'Enter your password',
                inputAttributes: {
                  maxlength: 10,
                  autocapitalize: 'off',
                  autocorrect: 'off'
                }
              })
              .then(async(result) => {
                if (result.value) {
                    const usuario_entregar={
                        id:usuario.id,
                        password:result.value,
                    }
                    console.log(usuario_entregar);
                    const answers = JSON.stringify(result.value);
                    let url = '/perfil/'+usuario.id;
                    await axios.put(url,usuario_entregar).then(response=>{
                        console.log(response.data);
                        this.mensaje=response.data;
                    })
                    this.getUsuarios();
                    Swal.fire({
                        icon: 'success',
                        title: 'Editado satisfactorio',
                        showConfirmButton: false,
                        timer: 1400
                      })
                }
            })
        },
        cambiarDatosUsuarios(usuario){
            
            const { value: formValues } =  Swal.fire({
                title: 'Editar Usuario',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Guardar',
                html:
                  '<h2>Nombre<h2>'+
                  '<input id="swal-input1" value="'+
                  usuario.name+
                  '" class="swal2-input" >' +
                  '<h2>Descripcion<h2>'+
                  '<input id="swal-input2" value="'+
                 usuario.email+
                  '" class="swal2-input" type="email">',
                focusConfirm: false,
                preConfirm: () => {
                    let name = document.getElementById('swal-input1').value;
                    let email = document.getElementById('swal-input2').value;
                    
                    if (name==""){
                        toastr["error"]("Nombre no debe ser vacío", "Error")
                        toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": true,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                        }
                        return false
                    }
                    if (email==""){
                        toastr["error"]("Correo no debe ser vacío", "Error")
                        toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": true,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                        }
                        return false
                    }
                    else{
                        return[ document.getElementById('swal-input1').value,document.getElementById('swal-input2').value]
                    }
                    
                }
              }).then(async(result) => {
                if (result.value) {
                    const usuario_entregar={
                        id:usuario.id,
                        name:result.value[0],
                        email:result.value[1],
                    }
                    console.log(usuario_entregar);
                    const answers = JSON.stringify(result.value);
                    let url = '/perfil/'+usuario.id;
                    await axios.put(url,usuario_entregar).then(response=>{
                        console.log(response.data);
                        this.mensaje=response.data;
                    })
                    this.getUsuarios();
                    Swal.fire({
                        
                        icon: 'success',
                        title: 'Editado satisfactorio',
                        showConfirmButton: false,
                        timer: 1400
                      })
                }
            })
              
         
        },
        eliminarUsuario(usuario){
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            
            swalWithBootstrapButtons.fire({
                title: '¿Estás seguro?',
                html: "Se eliminará el usuario <strong>"+usuario.name+"</strong><br> No se podrá revertir",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'No, cancelar!',
                confirmButtonColor:'#00DD00',
                cancelButtonColor:'#DD0000',
                reverseButtons: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let url ='/perfil/'+usuario.id;
                    await axios.delete(url).then(response=>{
                        console.log(response.data)
                        this.mensaje=response.data;
                    });

                    this.getUsuarios();
                    Swal.fire({
                            
                        icon: 'success',
                        title: 'El usuario ha sido eliminada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
                ) {
                    Swal.fire({
                            
                        icon: 'error',
                        title: 'El usuario no se ha eliminado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    },
    },
    //despues que vue ejecuta realiza un comando
    mounted(){ 
        this.getTareas();
        this.getUsuarios();
    }
  })
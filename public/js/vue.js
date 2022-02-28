
var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      tareas: [],
    },
    methods:{
        getTareas(){
            let url = '/tareas';
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
                        tarea={
                            nombre:result.value[0],
                            descripcion:result.value[1],
                            fecha_inicio:result.value[2][0],
                            fecha_final:result.value[2][1]
                        }
                        console.log(tarea);
                        const answers = JSON.stringify(result.value);
                        let url = '/tareas';
                        await axios.post(url,tarea).then(response=>{
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
                    let url ='/tareas/'+tarea.id
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
        }
    },
    //despues que vue ejecuta realiza un comando
    mounted(){ 
        this.getTareas();
    }
  })

  
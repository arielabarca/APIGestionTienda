// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarUsuarios();
  $('#usuarios').DataTable();
  actualizarEmailUsuario();
});

function actualizarEmailUsuario(){
    document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}

async function cargarUsuarios(){

  const request = await fetch('api/usuarios', {
    method: 'GET',
    headers: getHeaders()
  });
  const usuarios = await request.json();


  let listadoHtml = '';
  for (let usuario of usuarios){
    let botonEliminar  = '<a href="#" onclick="eliminarUsuario('+usuario.id+')" class="btn btn-danger btn-circle btn-sm" style="margin-rigth: 10px" ><i class="fas fa-trash"></i></a>';
    let botonModificar = '<a href="#" onclick="eliminarUsuario('+usuario.id+')" class="btn btn-warning btn-circle btn-sm" style="margin-left: 10px" ><i class="fas fa-exclamation-triangle"></i></a>';
    let telefonoTexto = usuario.telefono == null ? '-' : usuario.telefono

    let usuarioHtml = '<tr><td>'+usuario.id+'</td><td>'+usuario.nombre+' '+usuario.apellido+
                      '</td><td>'+usuario.email+'</td><td>'+telefonoTexto+
                      '</td><td>'+botonEliminar+''+botonModificar+'</td></tr>';
    listadoHtml += usuarioHtml;

  }

document.querySelector('#usuarios tbody').outerHTML = listadoHtml;

}

async function eliminarUsuario(id) {

    if (confirm('Desea Eliminar???')){
        const request = await fetch('api/usuarios/'+ id, {
                method: 'DELETE',
                headers: getHeaders()
        });
        location.reload();
    } else {
        return;
    }
}

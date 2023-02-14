// Call the dataTables jQuery plugin
$(document).ready(function() {
    $('#compras').DataTable();
      actualizarEmailUsuario();
      cargarCompras();
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
    
  async function registrarCompras(){
  
    let datos = {};
    datos.fecha = Date.now();
    datos.descripcion = document.getElementById('txtDescripcion').value;
    datos.precio = document.getElementById('txtPrecio').value;
  
    if (datos === ''){
      alert('Debe ingresar datos para dar de alta un producto');  
      return;
    }
    if (datos.descripcion ===''){
        alert('La DESCRIPCION no puede estar vacia');  
        return;
      }
    if (isNaN(datos.precio) || datos.precio === ''){
      alert('El PRECIO debe ser numérico');  
      return;
    }
  
    const request = await fetch('api/compras', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(datos)
    });
    alert("Nueva Compra dada de alta correctamente ")
    window.location.href = 'compras.html';
  }  
  
  async function cargarCompras(){
  
    const request = await fetch('api/compras', {
      method: 'GET',
      headers: getHeaders()
    });
    const compras = await request.json();
  
    /*
      TODO Crear la funcion Modificar
    */
    let listadoHtml = '';
    for (let compra of compras){
      let botonEliminar  = '<a href="#" onclick="eliminarCampo('+compra.id+')" class="btn btn-danger btn-circle btn-sm" style="margin-rigth: 10px" ><i class="fas fa-trash"></i></a>';
      let botonModificar = '<a href="#" onclick="eliminarCampo('+compra.id+')" class="btn btn-warning btn-circle btn-sm" style="margin-left: 10px" ><i class="fas fa-exclamation-triangle"></i></a>';
  
      let usuarioHtml = '<tr><td>'+compra.descripcion+'</td><td>'+compra.fecha.substr(0,10)+'</td><td>'+compra.precio+'</td><td>'+botonEliminar+''+botonModificar+'</td></tr>';
      listadoHtml += usuarioHtml;
  
    }
  
  document.querySelector('#articulos tbody').outerHTML = listadoHtml;
  
  }
  
  async function eliminarCampo(id) {
  
      if (confirm('Desea Eliminar???')){
          const request = await fetch('api/compras/'+ id, {
                  method: 'DELETE',
                  headers: getHeaders()
          });
          location.reload();
      } else {
          return;
      }
  
  
  }
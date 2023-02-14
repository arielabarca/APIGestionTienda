// Call the dataTables jQuery plugin
$(document).ready(function() {
    $('#proveedores').DataTable();
      actualizarEmailUsuario();
      cargarProveedores();
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
    
  async function registrarProveedor(){
  
    let datos = {};
    datos.razonSocial = document.getElementById('txtRazonSocial').value;
    datos.telefono = document.getElementById('txtTelefono').value;
    datos.email = document.getElementById('txtEmail').value;
    datos.fechaAlta = Date.now();
    datos.descripcion = document.getElementById('txtDescripcion').value;
  
    if (datos === ''){
      alert('Debe ingresar datos para dar de alta un producto');  
      return;
    }
    if (datos.razonSocial === ''){
      alert('La RAZON SOCIAL no puede estar vacio');  
      return;
    }
    if (isNaN(datos.telefono) || datos.telefono === ''){
      alert('El TELEFONO debe ser numérico');  
      return;
    }
    if (datos.email === ''){
      alert('El EMAIL no puede estar vacio');  
      return;
    }
    if (datos.descripcion ===''){
      alert('La DESCRIPCION no puede estar vacia');  
      return;
    }
  
    const request = await fetch('api/proveedores', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(datos)
    });
    alert("Nuevo Proveedor dado de alta correctamente ")
    window.location.href = 'proveedores.html';
  }  
  
  async function cargarProveedores(){
  
    const request = await fetch('api/proveedores', {
      method: 'GET',
      headers: getHeaders()
    });
    const proveedores = await request.json();
  
    /*
      TODO Crear la funcion Modificar Articulo
    */
    let listadoHtml = '';
    for (let proveedor of proveedores){
      let botonEliminar  = '<a href="#" onclick="eliminarCampo('+proveedor.id+')" class="btn btn-danger btn-circle btn-sm" style="margin-rigth: 10px" ><i class="fas fa-trash"></i></a>';
      let botonModificar = '<a href="#" onclick="eliminarCampo('+proveedor.id+')" class="btn btn-warning btn-circle btn-sm" style="margin-left: 10px" ><i class="fas fa-exclamation-triangle"></i></a>';
  
      let usuarioHtml = '<tr><td>'+proveedor.razonSocial+'</td><td>'+proveedor.id+'</td><td>'+proveedor.telefono+'</td><td>'+proveedor.email+'</td><td>'+proveedor.fechaAlta.substr(0,10)+
                        '</td><td>'+proveedor.descripcion+'</td><td>'+botonEliminar+''+botonModificar+'</td></tr>';
      listadoHtml += usuarioHtml;
  
    }
  
  document.querySelector('#articulos tbody').outerHTML = listadoHtml;
  
  }
  
  async function eliminarCampo(id) {
  
      if (confirm('Desea Eliminar???')){
          const request = await fetch('api/proveedores/'+ id, {
                  method: 'DELETE',
                  headers: getHeaders()
          });
          location.reload();
      } else {
          return;
      }
  
  
  }
// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#articulos').DataTable();
  $('#proveedores').DataTable();
    actualizarEmailUsuario();
    cargarArticulos();
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

async function cargaProveedores(){
  if(document.getElementById('SelectOption').value){
    return;
  }
  
  const request = await fetch('api/proveedores', {
    method: 'GET',
    headers: getHeaders()
  });
  
  const proveedores = await request.json();
  let listadoHtml = '';
  let proveedorHtml = '';
  var numId = 100;
  for (let proveedor of proveedores){
    proveedorHtml   = '<option id="'+numId+'" value="'+proveedor.id+'">'+proveedor.razonSocial+'</option>';
    listadoHtml += proveedorHtml;
    numId = numId + 1;
  }
  document.querySelector('#SelecOptgroup option').outerHTML = listadoHtml; 
}

async function cargaIdProveedor(){
  document.getElementById('txtProveedorId').value = document.getElementById('selecProveedor').value;
}

async function registrarArticulos(){

  let datos = {};
  datos.proveedor = document.getElementById('txtProveedorId').value;
  datos.cantidad = document.getElementById('txtCantidad').value;
  datos.talle = document.getElementById('txtTalle').value;
  datos.descripcion = document.getElementById('txtDescripcion').value;
  datos.costo = document.getElementById('txtCosto').value;
  datos.precio = document.getElementById('txtPrecio').value;

  if (datos === ''){
    alert('Debe ingresar datos para dar de alta un producto');  
    return;
  }
  if (datos.proveedor === ''){
    alert('El PROVEEDOR no puede estar vacio');  
    return;
  }
  if (isNaN(datos.cantidad) || datos.cantidad === ''){
    alert('La CANTIDAD debe ser numérico');  
    return;
  }
  if (datos.talle === ''){
    alert('El TALLE no puede estar vacio');  
    return;
  }
  if (!isNaN(datos.descripcion) || datos.descripcion ===''){
    alert('La DESCRIPCION no puede estar vacia');  
    return;
  }
  if (isNaN(datos.costo) || datos.costo === ''){
    alert('El COSTO debe ser numérico');  
    return;
  }
  if (isNaN(datos.precio) || datos.precio === ''){
    alert('El PRECIO debe ser numérico');  
    return;
  }

  const request = await fetch('api/articulos', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(datos)
  });
  alert("Articulo dado de alta correctamente ")
  window.location.href = 'articulos.html';
}  

async function cargarArticulos(){

  const request = await fetch('api/articulos', {
    method: 'GET',
    headers: getHeaders()
  });
  const articulos = await request.json();

  /*
    TODO Cambiar el articulo.proveedor por el nombre del proveedor desde la tabla proveedores
    TODO Crear la funcion Modificar Articulo
  */
  let listadoHtml = '';
  for (let articulo of articulos){
    let botonEliminar  = '<a href="#" onclick="eliminarArticulo('+articulo.id+')" class="btn btn-danger btn-circle btn-sm" style="margin-rigth: 10px" ><i class="fas fa-trash"></i></a>';
    let botonModificar = '<a href="#" onclick="eliminarArticulo('+articulo.id+')" class="btn btn-warning btn-circle btn-sm" style="margin-left: 10px" ><i class="fas fa-exclamation-triangle"></i></a>';

    let usuarioHtml = '<tr><td>'+articulo.id+'</td><td>'+articulo.proveedor+'</td><td>'+articulo.cantidad+'</td><td>'+articulo.descripcion+'</td><td>'+articulo.talle+
                      '</td><td>'+articulo.costo+'</td><td>'+articulo.precio+
                      '</td><td>'+botonEliminar+''+botonModificar+'</td></tr>';
    listadoHtml += usuarioHtml;

  }

document.querySelector('#articulos tbody').outerHTML = listadoHtml;

}

async function eliminarArticulo(id) {

    if (confirm('Desea Eliminar???')){
        const request = await fetch('api/articulos/'+ id, {
                method: 'DELETE',
                headers: getHeaders()
        });
        location.reload();
    } else {
        return;
    }


}
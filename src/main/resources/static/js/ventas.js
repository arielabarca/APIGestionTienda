// Call the dataTables jQuery plugin
$(document).ready(function() {
    $('#ventas').DataTable();
    $('#articulos').DataTable();
      actualizarEmailUsuario();
      cargarVentas();
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
  
  async function cargaArticulos(){
    if(document.getElementById('SelectOption').value){
      return;
    }
    
    const request = await fetch('api/articulos', {
      method: 'GET',
      headers: getHeaders()
    });
    
    const articulos = await request.json();
    let listadoHtml = '';
    let proveedorHtml = '';
    var numId = 666999;
    for (let articulo of articulos){
      proveedorHtml   = '<option id="'+numId+'" value="'+[articulo.id , articulo.talle , articulo.precio , articulo.descripcion]+'">'+articulo.descripcion+'</option>';
      listadoHtml += proveedorHtml;
      numId = numId + 1;
    }
    document.querySelector('#SelecOptgroup option').outerHTML = listadoHtml; 
  }
  
  async function cargaIdArticulo(){
    let articuloSelectData = document.getElementById('selecArticulo').value;
    let articuloSelect = articuloSelectData.split(',');

    document.getElementById('txtIdArticulo').value = articuloSelect[0];
    document.getElementById('txtPrecio').value = articuloSelect[2];
    document.getElementById('txtUsuarioVenta').value = localStorage.email;
    document.getElementById('txtTalle').value = articuloSelect[1];

  }
  
  async function registrarVentas(){
    let articuloSelectData = document.getElementById('selecArticulo').value;
    let articuloSelect = articuloSelectData.split(',');

    let datos = {};
    datos.idArticulo = document.getElementById('txtIdArticulo').value;
    datos.fechaVenta = Date.now();
    datos.usuarioVenta = document.getElementById('txtUsuarioVenta').value; 
    datos.descripcion = articuloSelect[3];
    datos.talle = document.getElementById('txtTalle').value;
    datos.precioVenta = document.getElementById('txtPrecio').value; 
    datos.nroFactura = document.getElementById('txtNroFactura').value;
    datos.medioPago = document.getElementById('txtMedioPago').value;

    if (datos === ''){
      alert('Debe ingresar datos para dar de alta un producto');  
      return;
    }
  
    const request = await fetch('api/ventas', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(datos)
    });

    alert("Nueva VENTA dada de alta correctamente ")
    window.location.href = 'ventas.html';
  }  
  
  async function cargarVentas(){
  
    const request = await fetch('api/ventas', {
      method: 'GET',
      headers: getHeaders()
    });
    const ventas = await request.json();
  
    /*
      TODO Crear la funcion Modificar
    */
    let listadoHtml = '';
    for (let venta of ventas){
      let botonEliminar  = '<a href="#" onclick="eliminarCampo('+venta.nroVenta+')" class="btn btn-danger btn-circle btn-sm" style="margin-rigth: 10px" ><i class="fas fa-trash"></i></a>';
      let botonModificar = '<a href="#" onclick="eliminarCampo('+venta.nroVenta+')" class="btn btn-warning btn-circle btn-sm" style="margin-left: 10px" ><i class="fas fa-exclamation-triangle"></i></a>';
  
      let usuarioHtml = '<tr><td>'+venta.idArticulo+'</td><td>'+venta.descripcion+'</td><td>'+venta.fechaVenta.substr(0,10)+'</td><td>'+venta.talle+'</td><td>'
                        +venta.precioVenta+'</td><td>'+venta.usuarioVenta+'</td><td>'+venta.nroFactura+'</td><td>'+venta.medioPago+'</td><td>'+botonEliminar+''+botonModificar+'</td></tr>';
      listadoHtml += usuarioHtml;
  
    }
  
  document.querySelector('#ventas tbody').outerHTML = listadoHtml;
  
  }
  
  async function eliminarCampo(id) {
  
      if (confirm('Desea Eliminar???')){
          const request = await fetch('api/ventas/'+ id, {
                  method: 'DELETE',
                  headers: getHeaders()
          });
          location.reload();
      } else {
          return;
      }
  
  
  }
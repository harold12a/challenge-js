
let form = document.getElementById('form');

let url = 'https://pro-talento.up.railway.app/api/mindy/products';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    let nombre = document.getElementById('nombre').value;
    let imagen = document.getElementById('imagen').value;
    let descripcion = document.getElementById('descripcion').value;
    let tipo = document.getElementById('tipo')
    let tipoSeleccionado = tipo.selectedOptions[0].text
    let precio = document.getElementById('precio').value;
    let stock = document.getElementById('stock').value;
  
     // Validar que todos los campos del formulario están completos antes de enviar el formulario
  if (nombre && imagen && descripcion && tipoSeleccionado && precio && stock) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre,
          imagen: imagen,
          descripcion: descripcion,
          tipo: tipoSeleccionado,
          precio: precio,
          stock: stock
        })
      });

      const data = await response.json();
      console.log('respuesta recibida', data);     
      // Agrega una alerta si los datos se enviaron correctamente
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Los datos se han enviado correctamente',
        showConfirmButton: false,
        timer: 1500
      })

    } catch (error) {
      console.log('respuesta con error', error);

      // Agrega una alerta si ocurre un error al enviar el formulario
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error al enviar el formulario.!',
        footer: '<a href="">Por qué tengo este problema?</a>'
      })
    }
  } else {
    // Agrega una alerta si los campos no están completados correctamente
    Swal.fire('Por favor, complete todos los campos del formulario correctamente y vuelva a intentarlo.')
  }
});
  
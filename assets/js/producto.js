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
    } catch (error) {
      console.log('respuesta con error', error);
    }
  });
  
const url = `https://pro-talento.up.railway.app/api/mindy/products`;

let pharmacyProducts = [];

document.getElementById("searchButton").addEventListener("click", (e) => {
  e.preventDefault();
  filterData();
});

document.getElementById("orderData").addEventListener("change", (e) => {
  filterData();
});

/**
 * @fetchData Responsable de hacer la peticion de datos a @url y guardar los datos filtrados con el tipo "Medicamento" en @pharmacyProducts
 */

async function fetchData(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    pharmacyProducts = data.products.filter(
      (product) => product.tipo === "Medicamento"
    );
    refresh_cart_in_navbar();
    if (pharmacyProducts.length == 0) {
      printEmpty();
    } else {
      printCards(pharmacyProducts);
    }
  } catch (error) {
    console.log(error);
  }
}

async function filterData() {
  try {
    let textSearch = document
      .getElementById("textSearch")
      .value.toLocaleLowerCase();
    let valueSelected = document.getElementById("orderData").value;

    let newUrl = url + `?tipo=medicamento&orden=${valueSelected}`;
    if (textSearch.length > 0) {
      newUrl += `&nombre=${textSearch}`;
    }
    fetchData(newUrl);
  } catch (error) {
    console.log(error);
  }
}

fetchData(url);

function printCards(products) {
  console.log(products);
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";
  products.forEach((product) => {
    cardsContainer.appendChild(createCard(product));
  });
}

function printEmpty() {
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";
  cardsContainer.innerHTML = `
        <div class="alert alert-danger" >
        No se han encontrado productos, intenta nuevamente</div>`;
}

function createCard({ imagen, nombre, descripcion, precio, _id, stock }) {
  let div = document.createElement("div");
  div.id = _id;
  div.className = "col-lg-2 col-md-4 col-sm-6 mb-4 mx-4";

  div.innerHTML = `
  <div class="card h-100">
        <div class="ratio ratio-4x3">
          <img src="${imagen}" alt="${nombre} image" class="card-img-top img-fluid">
        </div>
        <div class="card-body">
          <h5 class="card-title">${nombre}</h5>
          <p class="card-text">$ ${precio}</p>
          <button class="btn btn-primary mt-auto" onclick='addToCart("${_id}")'>Agregar al carrito</button>
        </div>
      </div>

    `;

  return div;
}


let addToCart = (producto_id) => {
    let storage = localStorage.getItem('cart');
    let data = [];
  
    if (storage?.length>0) {
      data = JSON.parse(storage)
    }
  
    let contador_unidades = document.getElementById("cart-count");
    data.push(producto_id);
    contador_unidades.innerHTML = ``
    contador_unidades.innerHTML = data.length
  
    localStorage.setItem('cart', JSON.stringify(data));
  }

  function refresh_cart_in_navbar() {
    let data_cart = JSON.parse(localStorage.getItem('cart')) ?? []
    let contador_unidades = document.getElementById("cart-count");
    contador_unidades.innerHTML = ``
    contador_unidades.innerHTML = data_cart.length
  }
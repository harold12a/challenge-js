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
  cardsContainer.innerHTML = '';
  products.forEach(product => {
    cardsContainer.appendChild(createCard(product))
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
  div.className = "card card-mindy";

  div.innerHTML = `
    <img src="${imagen} alt="${nombre} image">
    <div class="card-description">
        <div class="card-title">
            <h4 class="text-center">${nombre}</h4>
        </div>
        <div class="card-link d-flex justify-content-evenly align-items-center">
            <h2>$ ${precio}</h2>
        </div>
    </div>
    `;

  return div;
}

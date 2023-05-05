let url = `https://pro-talento.up.railway.app/api/mindy/products`;

let toys = [];

async function fecthApi() {
  try {
    let response = await fetch(url);
    response = await response.json();
    console.log("total " + response.products.length + " productos");

    toys = response.products.filter((item) => item.tipo==="Juguete");
    console.log(toys);

    printCards(toys);

    document.getElementById('buttonSearch').addEventListener('click', (event) => {
        event.preventDefault();
        filterData();
    });
    document.querySelector(".form-select").addEventListener('change', (event) => {
      filterData();
    });

  } catch (error) {
    console.log(error);
  }
}

fecthApi();

async function filterData() {
  try {
    let texto = document.getElementById('searchInText').value.toLowerCase();
    console.log(texto);

    let select = document.getElementById("select-ordering");
    let value_selected = select.value;
    // let label_selected = select.options[select.selectedIndex].text;

    let url = `https://pro-talento.up.railway.app/api/mindy/products`;
    url += `?tipo=juguete&orden=${value_selected}`;
    if (texto.length != 0) {
      url += `&nombre=${texto}`;
    }
    console.log(url);
    let response = await fetch(url);
    response = await response.json();
    let toysFiltered = response.products;

    if (toysFiltered.length == 0) {
      printEmpty();
    } else {
      printCards(toysFiltered);
    }
  } catch (error) {
    console.log(error);
  }

}

/* FUNCTION: Pinta las cards según el arreglo de eventos
 * que ingrese por parámetro */
function printCards(array) {
    const containerCategory = document.getElementById('container-toys');
    containerCategory.innerHTML = '';

    for (let i = 0; i < array.length; i++) {

        let div = createToyCard(array[i]);
        containerCategory.appendChild(div)

    }
}

/* FUNCTION: Pinta mensaje de eventos vacíos */
function printEmpty() {
    const containerCards = document.getElementById('container-toys');
    containerCards.innerHTML = '';

    containerCards.innerHTML = `
        <div class="alert alert-danger" role="alert" style="display:flex; justify-content:center; padding:20px; margin:5px 20px 0px 20px font-family: 'Secular One', sans-serif;" >
        NO SE HAN ENCONTRADO JUGUETES CON TU BUSQUEDA, INTENTA DE NUEVO</div>`;
}

/* FUNCTION: Retorna UN div para cada juguete */
function createToyCard(producto) {

    let div = document.createElement('div');
    div.id = producto._id;
    div.className = 'card card-mindy'

    div.innerHTML = `
        <img src="${producto.imagen}" alt="Toy">
        <ul class="product_item_hover">
            <li>
                <button class="btn btn-mindy-two isFavorite" onclick='addToFav("${producto._id}")'>
                    <i class="bi bi-heart"></i>
                </button>
            </li>
            <li>
                <button class="btn btn-mindy-two addToCart">
                    <i class="bi bi-cart-fill"></i>
                </button>
            </li>
        </ul>
        <div class="card-description">
            <div class="card-title">
                <h4 style="text-align:center" >${producto.nombre}</h4>
            </div>
            <div class="card-link d-flex justify-content-evenly align-items-center">
                <h2>$ ${producto.precio}</h2>
            </div>
        </div>`
    return div
}

/* FUNCTION: agrega producto(juguete) a favoritos */
let addToFav = (producto_id) => {
  // console.log(producto_id);
  let storage = localStorage.getItem('favoritos');
  let data = [];

  if (storage?.length>0) {
    data = JSON.parse(storage)
  }
  if (data.includes(producto_id)) {
    data = data.filter(each => each !== producto_id);
  } else {
    data.push(producto_id);
  }
  localStorage.setItem('favoritos', JSON.stringify(data));
}

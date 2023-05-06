let url = `https://pro-talento.up.railway.app/api/mindy/products`;

async function fecthApi() {
    try {
        let response = await fetch(url);
        response = await response.json();

        //traer los datos del local storage
        let data_cart = JSON.parse(localStorage.getItem('cart')) ?? []

        //pasarlos a array de objetos
        let prod_filtered = data_cart.map(each => {
            return response.products.find((obj) => obj._id === each)
        }).reduce((acc, product) => {
            let answer = acc
            let included = answer.find((obj) => obj._id === product._id)
            if (included) {
                let idx = answer.indexOf(included)
                answer[idx].cant += 1
            } else {
                answer.push({
                    _id: product._id,
                    nombre: product.nombre,
                    imagen: product.imagen,
                    tipo: product.tipo,
                    precio: product.precio,
                    cant: 1
                })
            }
            return answer
        },[])

        // mostrar carrito
        refresh_cart_in_navbar(data_cart.length);
        printCards(prod_filtered);
    } catch (error) {
        console.log(error);
    }
}

fecthApi();

/* FUNCTION: refresca el numero de elementos en el carrito */
function refresh_cart_in_navbar(number_items) {
    let contador_unidades = document.getElementById("cart-count");
    contador_unidades.innerHTML = ``
    contador_unidades.innerHTML = number_items
}

/* FUNCTION: Pinta las cards según el arreglo de productos del carrito */
function printCards(array) {
    // parte principal

    const containerCategory = document.getElementById('items');
    containerCategory.innerHTML = ``;

    array.forEach(product => {
        let div = document.createElement('div');
        div.id = product._id;
        div.className = 'row d-flex justify-content-between align-items-center mb-4'
        div.innerHTML += `

            <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <img src="${product.imagen}"
                class="img-fluid rounded" alt="${product.nombre}">
            </div>

            <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <h6 class="fw-bold text-body-secondary">${product.tipo}</h6>
                <h6 class="fw-bold">${product.nombre}</h6>
            </div>

            <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <h6 class="fw-bold text-body-secondary">Cantidad</h6>
                <input id="form1" min="0" name="quantity" value="${product.cant}" type="number"
                class="form-control form-control-sm" />
            </div>

            <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-nowrap">
                <h6 class="fw-bold text-body-secondary text-end">Subtotal</h6>
                <h6 class="text-end" id="abc">$ 44.00</h6>
            </div>
        `;
        containerCategory.appendChild(div);
    });

    // parte summary
    const itemsSummary = document.getElementById('amount');
    itemsSummary.innerHTML = ``;
    itemsSummary.innerHTML = array.length + " items";
}

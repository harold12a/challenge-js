let url = `https://pro-talento.up.railway.app/api/mindy/products`;

let current_cart = []

async function fecthApi() {
    try {
        let response = await fetch(url);
        response = await response.json();

        //traer los datos del local storage
        let data_cart = JSON.parse(localStorage.getItem('cart')) ?? []

        //pasarlos a array de objetos
        current_cart = data_cart.map(each => {
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

        // acciones en navbar y div principal para items carrito
        refresh_cart_in_navbar(data_cart.length);
        printCards(current_cart);
    } catch (error) {
        console.log(error);
    }
}

fecthApi();

/* FUNCTION: refresca el numero de elementos del carrito en el navbar */
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
    let [cant, subtotal] = calculate_subtotal(array);

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
                <h6 class="fw-bold">$ ${product.precio}</h6>
            </div>

            <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <h6 class="fw-bold text-body-secondary">Cantidad</h6>
                <input id="n${product._id}" class="form-control form-control-sm quantity"
                name="quantity" type="number" min="0" value="${product.cant}"
                oninput='updateValues("n${product._id}")' />
            </div>

            <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-nowrap">
                <h6 class="fw-bold text-body-secondary text-end">Subtotal</h6>
                <h6 class="text-end" id="subt${product._id}">
                $ ${product.cant * product.precio}</h6>
            </div>
        `;
        containerCategory.appendChild(div);
    });

    // parte summary
    printSummary(cant, subtotal)
}

/* FUNCTION: Pinta los valores de la sección summary */
function printSummary(cant, subtotal) {
    const p_items = document.getElementById('amount');
    p_items.innerHTML = `${cant} items`;

    const p_subtotal = document.getElementById('subtotal');
    p_subtotal.innerHTML = `$ ${subtotal}`;

    const p_shipping = document.getElementById('shipping');
    p_shipping.innerHTML = `$ 2`;

    const p_total = document.getElementById('total');
    p_total.innerHTML = `$ ${subtotal + 2}`;
}

/* FUNCTION: calcula subtotal */
function calculate_subtotal(array) {
    return (array.reduce((acc, obj) => {
        let cant = acc[0]
        let subtotal = acc[1]
        cant = cant + obj.cant
        subtotal = subtotal + (obj.precio * obj.cant)
        return [cant, subtotal]
    },[0,0]))
}

/* FUNCTION: actualiza valores en carrito */
function updateValues (idInput) {
    // tomando la nueva cantidad y actualizando carrito
    let prod_to_update = current_cart.find((obj) => obj._id === idInput.substring(1))
    prod_to_update.cant = Number(document.getElementById(idInput).value)
    // actualizando subtotal del producto actualizado
    document.getElementById("subt"+idInput.substring(1)).innerHTML = `$ ${prod_to_update.precio * prod_to_update.cant}`
    // actualizando summary
    let [cant, subtotal] = calculate_subtotal(current_cart);
    printSummary(cant, subtotal)
    // actujalizando navbar
    refresh_cart_in_navbar(cant);
}

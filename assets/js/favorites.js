let url = `https://pro-talento.up.railway.app/api/mindy/products`;

let current_fav = []

async function fecthApi() {
    try {
        let response = await fetch(url);
        response = await response.json();

        //traer los datos del local storage
        let data_fav = JSON.parse(localStorage.getItem('favoritos')) ?? []

        //pasarlos a array de objetos
        current_fav = data_fav.map(each => {
            return response.products.find((obj) => obj._id === each)
        })

        printCards(current_fav);
    } catch (error) {
        console.log(error);
    }
}

fecthApi();

/* FUNCTION: Pinta las cards según el arreglo de productos del carrito */
function printCards(array) {
    // parte principal

    const containerCategory = document.getElementById('container-fav');
    containerCategory.innerHTML = ``;

    array.forEach(product => {
        let div = document.createElement('div');
        div.id = product._id;
        div.className = 'd-flex flex-column justify-content-between mb-4 div-fav'
        div.innerHTML += `
            <div class="">
                <img src="${product.imagen}" class="img-fluid rounded" alt="${product.nombre}">
            </div>

            <div class="card-body">
                <p class="card-text">
                    <h6 class="fw-bold text-body-secondary">${product.tipo}</h6>
                    <h6 class="fw-bold">${product.nombre}</h6>
                </p>
            </div>
        `;
        containerCategory.appendChild(div);
    });
}

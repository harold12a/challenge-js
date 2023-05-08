const url = `https://pro-talento.up.railway.app/api/mindy/products`;

let pharmacyProducts = []

document.getElementById('searchButton').addEventListener('click', (e)=> {
    e.preventDefault();
    filterData();
})

document.getElementById('orderData').addEventListener('click', (e) => {
    filterData();
})

/**
 * @fetchData Responsable de hacer la peticion de datos a @url y guardar los datos filtrados con el tipo "Medicamento" en @pharmacyProducts
 */

async function fetchData(){
    try{

        let response = await fetch(url)
        let data = await response.json()
        pharmacyProducts = data.products.filter((product) => product.tipo === "Medicamento")
    }catch(error){
        console.log(error)
    }
}

fetchData();
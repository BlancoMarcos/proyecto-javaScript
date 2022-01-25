// ARRAY DE PRODUCTOS

const products = []

class Camisetas {
    constructor(id, nombre, precio, imagen) {
        this.id = id,
            this.nombre = nombre,
            this.precio = precio,
            this.imagen = imagen
    }
}

// VARIABLES

const argTit = new Camisetas(1, "Argentina Titular", 8000, "https://http2.mlstatic.com/D_NQ_NP_835532-MLA48506715862_122021-O.webp");
const argEnt = new Camisetas(2, "Argentina Entrenamiento", 6000, "https://http2.mlstatic.com/D_NQ_NP_889120-MLA48506845136_122021-O.webp");
const psgTit = new Camisetas(3, "PSG Titular", 10000, "https://http2.mlstatic.com/D_NQ_NP_873636-MLA48563574652_122021-O.webp");
const psgSup = new Camisetas(4, "PSG Suplente", 12000, "https://http2.mlstatic.com/D_NQ_NP_991645-MLA48507745974_122021-O.webp");
const psgAlt = new Camisetas(5, "PSG Alternativa", 14000, "https://http2.mlstatic.com/D_NQ_NP_905541-MLA48507932278_122021-O.webp");

// PUSH

products.push(argTit);
products.push(argEnt);
products.push(psgTit);
products.push(psgSup);
products.push(psgAlt);

// CREAMOS LAS CONSTANTES

const input = document.querySelector("#productEnter"); 
const filterCard = document.querySelector(".cardAlert")

// FUNCION CREACION Y FILTRO DE CARDS

function filtrarCards() {
    filterCard.innerHTML = "";
    const itemSearch = input.value.toLowerCase();
    for (let i = 0; i < products.length; i++) {
        let nameSearch = products[i].nombre.toLowerCase();
        if (nameSearch.indexOf(itemSearch) !== -1) {
            filterCard.innerHTML += `
        <div class="card bg-dark" style="width: 18rem;">
        <img class="card-img-top"
        src="${products[i].imagen}"
        alt="Card image cap">
            <div class="card-body text-center">
        <h5 class="card-title text-info">${products[i].nombre}</h5>
        <p class="card-text">$${products[i].precio}</p>
        <a class="btn btn-outline-info">Añadir al carrito</a>
            </div>
        </div>
         `
        }
    }
    if (filterCard.innerHTML === "") {
        filterCard.innerHTML += `<p>No contamos con el producto que estás buscando.</p>`
    }
};

input.addEventListener("keyup", filtrarCards);
filtrarCards();

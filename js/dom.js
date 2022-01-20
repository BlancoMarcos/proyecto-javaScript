const product = []

class Camisetas {
    constructor(id, nombre, precio, imagen) {
        this.id = id,
            this.equipo = nombre,
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

product.push(argTit);
product.push(argEnt);
product.push(psgTit);
product.push(psgSup);
product.push(psgAlt);

// AGREGAMOS UNA "CARD" PARA CADA CAMISETA

const cardCreated = document.querySelector(`#camisetasMessi`)

for (let i = 0; i < product.length; i++) {
    cardCreated.innerHTML += `
    <div class="card bg-dark" style="width: 18rem;">
            <img class="card-img-top"
            src="${product[i].imagen}"
            alt="Card image cap">
        <div class="card-body text-center">
            <h5 class="card-title text-info">${product[i].equipo}</h5>
            <p class="card-text">$${product[i].precio}</p>
            <a href="#" class="btn btn-outline-info">Añadir al carrito</a>
        </div>
    </div>
    `
};
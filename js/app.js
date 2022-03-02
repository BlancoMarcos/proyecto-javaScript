// PROYECTO FINAL

document.addEventListener('DOMContentLoaded', () => {
	console.log("HTML Listo");
})

// ARRAYS
const productos = [];
let carrito = [];

// CLASE CONSTRUCTORA

class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id,
            this.nombre = nombre,
            this.precio = precio,
            this.imagen = imagen
    }
}


// VARIABLES

const argTit = new Producto(1, "Argentina Titular", 8000, "https://http2.mlstatic.com/D_NQ_NP_835532-MLA48506715862_122021-O.webp");
const argEnt = new Producto(2, "Argentina Entrenamiento", 6000, "https://http2.mlstatic.com/D_NQ_NP_889120-MLA48506845136_122021-O.webp");
const psgTit = new Producto(3, "PSG Titular", 10000, "https://http2.mlstatic.com/D_NQ_NP_873636-MLA48563574652_122021-O.webp");
const psgSup = new Producto(4, "PSG Suplente", 12000, "https://http2.mlstatic.com/D_NQ_NP_991645-MLA48507745974_122021-O.webp");
const psgAlt = new Producto(5, "PSG Alternativa", 14000, "https://http2.mlstatic.com/D_NQ_NP_905541-MLA48507932278_122021-O.webp");


// PUSH

productos.push(argTit);
productos.push(argEnt);
productos.push(psgTit);
productos.push(psgSup);
productos.push(psgAlt);


// Creamos CARDS desde ARRAY

const cardConten = document.querySelector(".main__cardConten")

function crearCards() {
    for (const producto of productos) {
        $(cardConten).append(`
        <div class="card bg-dark col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 main__card main__cardsh main_cardPadd mx-3 my-3" style="width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top border border-dark border-1 rounded-1 main__card__img"
                alt="${producto.nombre}">
            <div class="card-body text-center">
                <h5 class="card-title fst-italic">${producto.nombre}</h5>
                <p class="card-text text-capitalize main__ff3 fst-italic fw-bold">$${producto.precio}</p>
                <button type="button" class="btn btn-outline-info eventButton" id="cardBtn">Agregar al carrito</button>
            </div>
        </div>
        `);
    }
}
crearCards();

// Buscamos target con evento click y asi poder agregar al carrito cada producto

const btnCardClick = document.querySelectorAll("#cardBtn");

btnCardClick.forEach(boton => {
    boton.addEventListener("click", agregarAlCarro)
});


function agregarAlCarro(e) {
    //detectamos el boton y traemos la informacion de cada elemento de la card del mismo
    const boton = e.target
    const prod = boton.closest(".card-body")
    const prodTitle = prod.querySelector(".card-title").textContent;
    const prodPrecio = prod.querySelector(".card-text").textContent
    //creamos un nuevo objeto para agregar al carrito con cantidad
    const prodNuevo ={nombre: prodTitle, precio: prodPrecio, cantidad: 1}
    añadirProducto(prodNuevo)
}

const bodyTabla = document.querySelector(".tablaBody")

//Enviamos el nuevo producto al carrito
function añadirProducto(prodNuevo) {
    const inputProd = bodyTabla.getElementsByClassName("inputTabla");
    //Iteramos para crear un solo elemento por producto, modificando cantidad con cada click
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre.trim() === prodNuevo.nombre.trim()) {
            carrito[i].cantidad ++;
            const inputCantidad = inputProd[i]
            inputCantidad.value++;
            // Calculamos total carrito
            totalCarrito()
            return null;
        }
    }
    carrito.push(prodNuevo)
    convertirCarrito()
}

//Enviamos el producto al modal

function convertirCarrito(){
    bodyTabla.innerHTML = "";
    //Creamos tabla para ingresar al Modal
    carrito.map(prod => {
        const filaTabla = document.createElement("tr");
        filaTabla.classList.add("prodCarrito");
        const datos = `<th scope="row">-</th>
                            <td class="table__productos text-start">
                                <h6 class="title">${prod.nombre}</h6>
                            </td>
                            <td class="table__precio"><p>${prod.precio}</p></td>
                            <td class="table__cantidad text-black">
                                <input class="inputTabla text-center col-1" type="number" min="1" value="${prod.cantidad}">
                                <button class="delete btn btn-danger btn-sm">x</button>
                            </td>`
        filaTabla.innerHTML = datos;
        bodyTabla.appendChild(filaTabla);

        filaTabla.querySelector(".delete").addEventListener("click", quitarProdCarrito);
        filaTabla.querySelector(".inputTabla").addEventListener("change", agregarCantidad)
    })
    // Calculamos total carrito
    totalCarrito()
}

// Funcion para calcular monto total del carrito
const totalCarritoProd = document.querySelector(".carritoTotalItem");
function totalCarrito() {
    let total = 0;
    // Indicamos que por cada elemento del carrito multiplique el precio por la cantidad
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ""))
        total = total + precio*item.cantidad;
    })
    totalCarritoProd.innerHTML = `Total $${total}`
    // agregamos carrito al LS
    agregarALS()
}

// Funcion para quitar producto del carrito con boton delete

function quitarProdCarrito(e) {
    const botonBorrar = e.target
    const fila = botonBorrar.closest(".prodCarrito");
    const nombre = fila.querySelector(".title").textContent;
    //recorremos carrito para elm
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre.trim() === nombre.trim()) {
            //Eliminamos un solo elemento del carrito
            carrito.splice(i, 1)
        } 
    }
    fila.remove()
    //Volvemos a calcular precio final
    totalCarrito()
} 

// Funcion para agregar cantidad en carrito con input

function agregarCantidad(e) {  
    const inputSumado = e.target 
    const fila = inputSumado.closest(".prodCarrito")
    const nombre = fila.querySelector(".title").textContent;
    carrito.forEach(item => {
        if (item.nombre.trim() === nombre) {
            inputSumado.value < 1 ? (inputSumado.value = 1) : inputSumado.value;
            item.cantidad = inputSumado.value;
            totalCarrito()
        }
    })
}

// Funcion para enviar carrito al LS

function agregarALS() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

// verificamos si hay datos en el LS para ingresar
// desde el inicio los productos al carrito 

window.onload = function () {
    const LS = JSON.parse(localStorage.getItem("carrito"))
    if (LS) {
        carrito = LS;
        convertirCarrito()
    }
}


// Funcion para eliminar todo el carrito

$("#btnBorra").click(() => { 
    localStorage.clear();
    carrito = [];
    bodyTabla.innerHTML = "";
    totalCarritoProd.innerHTML = `Total $0`
});

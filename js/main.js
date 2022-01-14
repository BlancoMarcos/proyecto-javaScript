const product = []

class Camisetas {
    constructor (id, nombre, precio) {
        this.id = id,
        this.equipo = nombre,
        this.precio = precio
    }
}

// VARIABLES

const argTit = new Camisetas(1, "Argentina Titular", 8000);
const psgTit = new Camisetas(2, "PSG Titular", 10000);
const psgSup = new Camisetas(3, "PSG Suplente", 12000);
const psgAlt = new Camisetas(4, "PSG Alternativa", 12000);

// PUSH

product.push(argTit);
product.push(psgTit);
product.push(psgSup);
product.push(psgAlt);

alert(`¡Bienvenido a nuestra tienda!`)

let productSelect = Number(prompt(`¿Qué camiseta desea comprar?
Ingrese número de orden.

1 - ${argTit.equipo} = $${argTit.precio}
2 - ${psgTit.equipo} = $${psgTit.precio}
3 - ${psgSup.equipo} = $${psgSup.precio}
4 - ${psgAlt.equipo} = $${psgAlt.precio}`));

if (!isNaN(productSelect) && productSelect <= 4 && productSelect > 0) {
    let quantitySelected = Number(prompt(`¿Qué cantidad querés agregar?`)) 
    
    function multiply (precio, cantidad) {
        precioFinal = precio * cantidad;
        return precioFinal
    }

        switch (productSelect) {
            case 1:
                multiply (argTit.precio, quantitySelected);
                alert(`El precio final de su compra es de $${precioFinal}`);
                break;
            case 2:
                multiply (psgTit.precio, quantitySelected);
                alert(`El precio final de su compra es de $${precioFinal}`);
                break;
            case 3:
            case 4:
                multiply (psgSup.precio || psgAlt, quantitySelected);
                alert(`El precio final de su compra es de $${precioFinal}`);
                break;
            default:
                alert(`¡Gracias por elegirnos!`);
                break;
    }

} else{
    alert(`Ha ingresado un valor erróneo. Si desea repetir el menú presione F5`);
}

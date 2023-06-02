class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const agrimonia = new Producto(1, "Agrimonia", 2500, "../img/aguafloral.png");
const melisa = new Producto(2, "Melisa", 2500, "../img/aguasflorales.jpeg");
const valeriana = new Producto(3, "Valeriana", 2500, "../img/aguafloral.png");
const muerdago = new Producto(4, "Muerdago", 2500, "../img/aguasflorales.jpeg");
const digitalis = new Producto(5, "Digitalis", 2500, "../img/aguasflorales.jpeg");
const aconitum = new Producto(6, "Aconitum", 2500, "../img/aguafloral.png");
const hamamelis = new Producto(7, "Hamamelis", 2500, "../img/aguasflorales.jpeg");
const platacoloidal = new Producto(8, "Plata Coloidal", 2500, "../img/platacoloidal.png");

const productos = [agrimonia, melisa, valeriana, muerdago, digitalis, aconitum, hamamelis, platacoloidal];

let carrito = [];

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                            <div class="card">
                            <img class="card-img-tom imgProductos" src="${producto.img}" alt="${producto.nombre}">
                                <div class="card-body">
                                    <h3>${producto.nombre}</h3>
                                    <p>${producto.precio}</p>
                                    <button class="btn colorBoton" id="boton${producto.id}"> Agregar al Carrito </button>
                                </div>
                            </div>`
        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })
    })
}

mostrarProductos();

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
}
const verCarrito = document.getElementById("verCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                            <div class="card">
                                <img class="card-img-tom imgProductos" src="${producto.img}" alt="${producto.nombre}">
                                <div class="card-body">
                                    <h3>${producto.nombre}</h3>
                                    <p>${producto.precio}</p>
                                    <p>${producto.cantidad}</p>
                                    <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar Producto </button>
                                </div>
                            </div>`
        contenedorCarrito.appendChild(card);
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })

    })
    calcularTotal();
}
const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    let indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}
const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    //localStorage: 
    localStorage.clear();
    mostrarCarrito();
}
const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total: $${totalCompra}`;
}



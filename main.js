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
const digitalis = new Producto(5, "Digitalis", 2500, "../img/aguafloral.png");
const aconitum = new Producto(6, "Aconitum", 2500, "../img/aguasflorales.jpeg");
const hamamelis = new Producto(7, "Hamamelis", 2500, "../img/aguafloral.png");
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


//botonfinalizarcompra

let btnfinalizarCompra=document.getElementById("finalizarCompra");
btnfinalizarCompra.addEventListener("click",()=>{
    swal.fire({
        title:"Finalizar compra?",
        icon:"question",
        confirmButtonText:"Aceptar",
        showCancelButtonText:"Cancelar"
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
                title:"Compra finalizada, Vuelva pronto",
                icon: "success",
                confirmButtonText:"Aceptar",
            })
        }
    })
})


/*
//Array de Consultas
let Consulta = [];

//Modifico el DOM
const formularioConsulta = document.getElementById("formularioConsulta");
const inputConsulta = document.getElementById("inputConsulta");
const listaConsulta = document.getElementById("listaConsultas");
const agregarNuevaConsulta = document.getElementById("agregarNuevaConsulta");
const empty = document.querySelector(".empty");

let valorConsulta = inputConsulta.value;

//Escuchar al formulario
formularioConsulta.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputConsulta.value !== '') {
        agregarConsulta(inputConsulta.value)
    }
})
/*
//Función agregar Consulta
const agregarConsulta = (valorConsulta) => {
    const nuevaConsulta = document.createElement("li");
    const primeraLetraMayuscula = valorConsulta.charAt(0).toUpperCase() + valorConsulta.slice(1);
    nuevaConsulta.innerHTML = `
                            <input type="checkbox" name="ConsultaCompleta" id="ConsultaCompleta">
                            <label id="nuevaConsulta">${primeraLetraMayuscula}</label>
                            <button id="eliminarItem-${valorConsulta}">
                                <span class="material-symbols-outlined" id="opciones">
                                    delete
                                </span>
                            </button>
                            `
        ;

//Agrego librería
const ConsultaExistente = Consulta.find(nuevaConsulta => nuevaConsulta.querySelector('label').textContent.toLowerCase() === valorConsulta.toLowerCase());
if (ConsultaExistente) {
    Toastify({
        text: "La Consulta ya existe",
        duration: 2000,
        style: {
            background: "#693772",
            color: "white",
            opacity: 70,
        },
    }).showToast();
    return;
} else {
    Toastify({
        text: "Consulta agregada",
        duration: 2000,
        style: {
            background: "#693772",
            color: "white",
            opacity: 70,
        },
    }).showToast();
    empty.style.display = "none";
}

listaConsulta.appendChild(nuevaConsulta);
Consulta.push(nuevaConsulta);

inputConsulta.value = '';

const botonEliminar = document.getElementById(`eliminarItem-${valorConsulta}`);
botonEliminar.addEventListener('click', () => {
    eliminarConsulta(valorConsulta);
})
}

//Función eliminar Tarea
const eliminarConsulta = (valorConsulta) => {
const ConsultaElementos = Array.from(listaConsulta.children);
const ConsultaEncontrada = ConsultaElementos.find(nuevaConsulta => nuevaConsulta.querySelector('label').textContent.toLowerCase() === valorConsulta.toLowerCase());
if (ConsultaEncontrada) {
    let indice = ConsultaElementos.indexOf(ConsultaEncontrada);
    ConsultaElementos.splice(indice, 1);
    listaConsulta.removeChild(ConsultaEncontrada);

    Consulta = ConsultaElementos;
}

if (Consulta.length === 0) {
    empty.style.display = "block";
}
};


//Fetch con Rutas Relativas
const listaSugerencias = document.getElementById("listaSugerencias");
const sugerenciasConsulta = "json/consultas.json";

fetch(sugerenciasConsulta)
    .then(respuesta => respuesta.json())
    .then(datos => {
        datos.forEach(tarea => {
            const divSugerenciaConsulta = document.createElement("div");
            const botonSugerenciaConsulta = document.createElement("button");

            divSugerenciaConsulta.id = "sugerenciaConsulta";
            botonSugerenciaConsulta.id = `btn-${tarea.nombre}`;
            botonSugerenciaConsulta.textContent = tarea.nombre;

            divSugerenciaConsulta.appendChild(botonSugerenciaConsulta);
            listaSugerencias.appendChild(divSugerenciaConsulta);

            const sugerenciaConsulta = document.getElementById(`btn-${Consulta.nombre}`);
            sugerenciaConsulta.addEventListener("click", () => {
                agregarConsulta(Consulta.nombre);
            });
        });
    })
    .catch(error => console.log(error));

if(result.isConfirmed) {
    window.location.href="inicio,html";
}*/
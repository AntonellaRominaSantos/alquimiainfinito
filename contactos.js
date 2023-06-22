//Comentarios de rutas relativas
console.log("Hola soy tercera pagina");
const contendorLista=document.getElementById("contenedorLista");
console.log(contendorLista);

const divComentarios= document.getElementById("divComentarios");
console.log(divComentarios);
const listaComentario= "../json/comentarios.json";
fetch(listaComentario)
.then(respuesta=>respuesta.json())
.then(datos=>{
    datos.forEach(comentarios=>{
        divComentarios.innerHTML +=`
        <p>${comentarios.id}-</p>
        <h5> -${comentarios.Nombre}</h5>
        <p>${comentarios.Comentario}</p>
        <hr>
        `
        } )
} ).catch(error =>console.log(error));
localStorage.getItem("divComentarios",JSON.stringify(divComentarios));
//Comentarios de rutas relativas

const divComentarios = document.getElementById("divComentarios");
console.log(divComentarios);
const listaComentario= "json/comentarios.json";
fetch(listaComentario)
.then(respuesta =>respuesta.json())
.then(datos=>{
    datos.forEach(comentarios=>{
        divComentarios.innerHTML +=`
        <p>${comentarios.id}--</p>
        <h5>-${comentarios.nombre}</h5>
        <p>${comentarios.Comentarios}</p>
        <hr>
        `
        })
}).catch(error=>console.log(error));
localStorage.getItem("divComentarios",JSON.stringify(divComentarios));
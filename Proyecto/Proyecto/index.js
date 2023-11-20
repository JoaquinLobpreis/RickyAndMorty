

/* function renderizado(){}renderizado()
 */
let url = "https://rickandmortyapi.com/api/character/"
/* Para contar la cantidad de tarjetas por pagina */
var cont = 0
function renderizado(actualPagina,genero,paginasTotales){
fetch(url +"?page="+ actualPagina + genero )
.then(res => res.json())
.then((data) =>{
    console.log(data)
    const element = document.querySelector("#tarjetas")
    let html = "" 
    /* Comillas invertidas */
    for (const iterator of data.results) {
        /* El mas hace que en cada vuelta se agregue el elemento que tenia antes */
        html +=     
    `
    <div class="contenedor">
    <h2 class="nombre"> ${iterator.name}</h2>
    <img src = ${iterator.image} alt ="" />
    <div class= "datos">
    <p>Género:  ${iterator.gender}</p>
    <p>Especie: ${iterator.species}</p>
    <p>Estatus: ${iterator.status}</p>
    <p>Origen:  ${iterator.origin.name}</p>
    <p>Locación:${iterator.location.name}</p>
    </div>
    <button  onclick ="personajeid(${iterator.id})" >VER MAS...</button>
    </div>
    `
    /* Cada vez que presiono el boton se accede a la funcion y se le envia la id del personaje */
  
    cont ++;
    }
    element.innerHTML = html
    if(paginasTotales === 1 || actualPagina === paginasTotales){
        ultimaPagina.disabled = true;
        siguientePagina.disabled = true ;
    }
    else{
        ultimaPagina.disabled = false;
        siguientePagina.disabled = false ;
    }
    document.getElementById("personajesListados").innerHTML = ` Personajes listados: ${cont}`;
    document.getElementById("paginasTotales").innerHTML = ` Total de páginas: ${paginasTotales}`;
    /* paginasTotales.textContent = ` Total de páginas: ${paginasTotales}` */
    document.getElementById("actualPagina").innerHTML = `${actualPagina}` 
    /* paginaActual.textContent = ` Pagina actual: ${actualPagina}`   */
    cont = 0
    paginaX.value = ""
    document.getElementById('contenidoFooter').style.display = 'block';
    /* Siempre que se renderiza que se vea el footer, esta puesto por lo de vermas */
})
}




const todos = document.getElementById("todos")
const hombres = document.getElementById("hombres")
const mujeres = document.getElementById("mujeres")
const singenero = document.getElementById("singenero")
const desconocido = document.getElementById("desconocido")
/* Cambios de pagina */
const anteriorPagina = document.getElementById("anteriorPagina")
const siguientePagina = document.getElementById("siguientePagina")
const primerPagina = document.getElementById("primerPagina")
const ultimaPagina = document.getElementById("ultimaPagina")
const paginaX = document.getElementById("paginaX")




/* Vuelve a mostrar todos los resultados */


let actualPagina = 1
var genero = ""
var paginasTotales = 42

renderizado(actualPagina,genero,paginasTotales)
/* verMAS Tiene que estar despues del primer renderizado porque todavia no existian los elementos dentro de la
las tarjetas en HTML */


primerPagina.disabled = true;
anteriorPagina.disabled = true;

function fetchTodos() {
    genero = ""
    actualPagina = 1
    paginasTotales = 42
    renderizado(actualPagina, genero, paginasTotales)
}
todos.onclick = fetchTodos

const fetchMujeres = () => {
    genero = "&gender=female"
    actualPagina = 1
    paginasTotales = 8
    renderizado(actualPagina,genero,paginasTotales)
}
mujeres.onclick = fetchMujeres

const fetchHombres = () => {
    genero = "&gender=male"
    actualPagina = 1
    paginasTotales = 31
    renderizado(actualPagina,genero,paginasTotales)
}
hombres.onclick = fetchHombres

const fetchSinGenero = () => {
    genero = "&gender=genderless"
    actualPagina = 1
    paginasTotales = 1

    renderizado(actualPagina,genero,paginasTotales)
}
singenero.onclick = fetchSinGenero

const fetchDesconocido = () => {
    genero = "&gender=unknown"
    actualPagina = 1
    paginasTotales = 3
    renderizado(actualPagina,genero,paginasTotales)
}
desconocido.onclick = fetchDesconocido


function anterior (){
    siguientePagina.disabled = false;
    ultimaPagina.disabled = false;
    actualPagina = actualPagina - 1;
    if(actualPagina === 1){
        primerPagina.disabled = true;
        anteriorPagina.disabled = true;
    }
    
    renderizado(actualPagina,genero,paginasTotales) 
}
anteriorPagina.onclick = anterior

function siguiente (){
    anteriorPagina.disabled = false;
    primerPagina.disabled = false;
    actualPagina = actualPagina + 1;
    if(actualPagina === paginasTotales){
        ultimaPagina.disabled = true;
        siguientePagina.disabled = true ;
    }
    renderizado(actualPagina,genero,paginasTotales) 
}
siguientePagina.onclick = siguiente

function primer (){
    ultimaPagina.disabled = false;
    siguientePagina.disabled = false;
    anteriorPagina.disabled = true;
    primerPagina.disabled = true ;
    actualPagina = 1
    renderizado(actualPagina,genero,paginasTotales)
}
primerPagina.onclick = primer

function ultima (){
    primerPagina.disabled = false;
    anteriorPagina.disabled = false;
    siguientePagina.disabled = true;
    ultimaPagina.disabled = true;
    actualPagina = paginasTotales
    renderizado(actualPagina,genero,paginasTotales) 
}
ultimaPagina.onclick = ultima

/* Keydown es cuando se presiona una tecla, lo relacionamos con enter */
/* Para que envie la pagina escrita al seleccionar enter */
paginaX.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
     /*  console.log(paginaX.value); Para comprobar que se estaba guardando el valor al colocar enter */
     if(paginaX.value > paginasTotales || paginaX.value < 1){
        paginaX.value =""
        window.alert("El numero ingresado debe encoontrarse entre 1 y " + paginasTotales);
     }
     else 
    /*  window.alert(paginaX.value); HACIENDO PRUEBAS */
     if(paginaX.value == paginasTotales){
            actualPagina = paginaX.value 
            ultima();
            
        }
        else if(paginaX.value == 1){
            actualPagina = paginaX.value 
            primer();
           
        }
        else {
        anteriorPagina.disabled = false;
        primerPagina.disabled = false;
        ultimaPagina.disabled = false;
        siguientePagina.disabled = false;
        actualPagina = parseInt(paginaX.value); 
        /* Muchos problemas por no colcar ParseINT!!! */
        renderizado(actualPagina,genero,paginasTotales)
         
     }
     }
     
    }
  );


  function personajeid(pid){
   /*  window.alert(pid); */
    renderizado2(pid)
}

/* RENDERIZADO PARA UN PERSONAJE EN ESPECIFICO */
function renderizado2(pid){
/*     window.alert(url + pid); */
    document.getElementById('contenidoFooter').style.display = 'none';
    /* De esta forma oculto el footer cuando estoy en un personaje en especifico */
    fetch(url + pid)
    .then(res => res.json())
    .then((data) =>{
        console.log(data)
        const element = document.querySelector("#tarjetas")
        let html = "" 
      
        
            /* El mas hace que en cada vuelta se agregue el elemento que tenia antes */
            element.innerHTML =  
        `
        <div class="contenedor">
        <h2 class="nombre"> ${data.name}</h2>
        <img src = ${data.image} alt ="" />
        <div class= "datos">
        <p>Género:  ${data.gender}</p>
        <p>Especie: ${data.species}</p>
        <p>Estatus: ${data.status}</p>
        <p>Origen:  ${data.origin.name}</p>
        <p>Locación:${data.location.name}</p>
        </div>
        <button  onclick ="renderizado(${actualPagina},'${genero}',${paginasTotales})" >VOLVER...</button>
        </div>
        `
        /* Se tienen que colocar las comillas simples en genero sino no funciona */
        /* window.alert(actualPagina + genero + paginasTotales); */
        
        
    })
   
    }
    



// constante global
const url_base = "https://swapi.dev/api/"

let rojo = document.getElementById("numRojo")
let verde = document.getElementById("numVerde")
let azul = document.getElementById("numAzul")

// Clase constructora
class Personaje {
    constructor(nombre, estatura, peso, fila) {
        this.nombre = nombre
        this.estatura = estatura
        this.peso = peso
        this.fila = fila
    }
    cargarTarjeta = (color) => {
        

        document.getElementById(`${this.fila}`).innerHTML += `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s"
                style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
                <div class="timeline-icon ${color}"></div>
                <div class="timeline-text">
                    <h6>${this.nombre}</h6>
                    <p>Estatura: ${this.estatura} mts</p>
                    <p>Peso: ${this.peso} kg</p>
                </div>
            </div>
        </div>
        `
    }
}

// Funcion creación personajes
const crearPersonaje = (data, fila) => {
    let personaje = new Personaje (data.name, data.height, data.mass, fila)
    return personaje
}

// Consumo API

const traerPersonaje = async(id, fila, color) => {
    try{
        let resultado = await fetch(`${url_base}people/${id}`)
        let respuesta = await resultado.json();
        let personaje = crearPersonaje(respuesta, fila)
        personaje.cargarTarjeta(color)
        console.log(personaje)
    }catch (err){
        throw new Error (err)
    }
}

function * generadorPersonaje(id, fila, color){
    yield traerPersonaje(id, fila, color);
    id++
    yield traerPersonaje(id, fila, color);
    id++
    yield traerPersonaje(id, fila, color);
    id++
    yield traerPersonaje(id, fila, color);
    id++
    yield traerPersonaje(id, fila, color);
    id++
}

let generadorRojo = generadorPersonaje(1, "filaRojo", "rojo")
let generadorVerde = generadorPersonaje(6, "filaVerde", "verde")
let generadorAzul = generadorPersonaje(11, "filaAzul", "azul")

/*
const listaGenerador = async (generador) => {
    let data = generador.next()
    if(!data.done){
        alert("no hay más personajes")
    }else{
        data.value
    } 

    if(!data.done){
        data.value
    }else{
        alert("no hay más personajes")
    }
}*/

rojo.addEventListener("click", async () => {
    let data = generadorRojo.next()
    !data.done ? data.value : alert("No hay mas personajes")
})

verde.addEventListener("click", async () => {
    let data = generadorVerde.next()
    !data.done ? data.value : alert("No hay mas personajes")
})

azul.addEventListener("click", async () => {
    let data = generadorAzul.next()
    !data.done ? data.value : alert("No hay mas personajes")
})

/*
rojo.addEventListener("click", listaGenerador(generadorRojo))
verde.addEventListener("click", listaGenerador(generadorVerde))
azul.addEventListener("click" , listaGenerador(generadorAzul))
*/


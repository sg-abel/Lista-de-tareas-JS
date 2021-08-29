//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//event listener
evenListeners();
function evenListeners() {

    //cuando el usuario agrega un Tweet
    formulario.addEventListener('submit', agregarTweet );

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();
    });
}


//funciones
function agregarTweet(e){
    e.preventDefault();

    //TextArea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //validación
    if (tweet === '') {
        mostrarError('El Tweet no puede ir vacio')

        return // evita que se ejecuten más lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

   //Añadir el arreglo de tweets
   tweets = [...tweets, tweetObj];

   //Una vez agregado se agregara el HTML
   crearHTML();

   //reiniciar el formulario
   formulario.reset();
}

//Mostrar mensaje de error

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();

    }, 3000)
}

//Muestra un listado de los Tweets
function crearHTML() {

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach( tweet => {
            //Agregar un boton para eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerHTML = 'X';

            //añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }
            
            
            //crear el HTML
            const li = document.createElement('li');

            //añadir el texto
            li.innerHTML = tweet.tweet;

            //asignar el boton
            li.appendChild(btnEliminar);

            //insertar en el HTML
            listaTweets.appendChild(li);
        });
    }

    sincronicarStorage();
}

//agrega los tweets actuales al local Storage
function sincronicarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

//elimina tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id );

    crearHTML();
}

//limpiar HTML
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

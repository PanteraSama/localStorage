//Variables

const listaTweets = document.getElementById('lista-tweets');

//EventListeners

eventListeners();

function eventListeners(){
    //Cuando se envia el formulario 
    document.querySelector('#formulario').addEventListener('submit',agregarTweet);
    //Se ejecuta funcion agregarTweet

    // Borrar Tweets

    listaTweets.addEventListener('click', borrarTweet);

    //Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);



}





//Funciones

    //agregar tweet del formulario
    function agregarTweet(e){

        e.preventDefault();

        //Leer el valor del textarea .value accede al valor del textarea
        const tweet = document.getElementById('tweet').value;

        //crear boton de eliminar - JS MODERNO: CREATEELEMENT
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = "X";

        //crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;

        //añade el boton de borrar al tweet
        li.appendChild(botonBorrar);
        //añade el tweet a la lista
        listaTweets.appendChild(li);

        //añadir a local storage
        agregarTweetLocalStorage(tweet);


}
//Elimina el tweet del dom


    function borrarTweet(e){

        e.preventDefault();
        //JS moderno
        if(e.target.className === 'borrar-tweet'){
            e.target.parentElement.remove();
            borrarTweetLocalStorage(e.target.parentElement.innerText);
            alert('Tweet eliminado');
        }

    }

    //Añadir a localstorage <---------
    //Mando el contenido del tweet ingresado por form
    function agregarTweetLocalStorage(tweet){

        let tweets;//lee todos los tweet que haya

        tweets = obtenerTweetLocalStorage();

        //Añadir el nuevo tweet
        tweets.push(tweet);
        //Convertir de string a arreglo para localstorage
        localStorage.setItem('tweets', JSON.stringify(tweets));


    }
    //Lee cuantos tweets hay en localstorage
    //Comprueba que haya elementos en localstorage, retorna un arreglo
    //Si hay se añade al arreglo
    function obtenerTweetLocalStorage(){
        let tweets;
        //Reviso los values de localstorage
        if(localStorage.getItem('tweets') === null){
            tweets = [];

        }else{
            tweets = JSON.parse(localStorage.getItem('tweets'));
        }
        return tweets;
    }
    //['Tweet 1', 'Tweet 2', 'Tweet 3']

    function localStorageListo(){
        let tweets;

        tweets = obtenerTweetLocalStorage();

        tweets.forEach(function(tweet){
            const botonBorrar = document.createElement('a');
            botonBorrar.classList = 'borrar-tweet';
            botonBorrar.innerText = "X";
    
            //crear elemento y añadirle el contenido a la lista
            const li = document.createElement('li');
            li.innerText = tweet;
    
            //añade el boton de borrar al tweet
            li.appendChild(botonBorrar);
            //añade el tweet a la lista
            listaTweets.appendChild(li);
        });
    }

    //Eliminar tweet de localstorage

    function borrarTweetLocalStorage(tweet, index){
        let tweets, tweetBorrar;
        //Elimina la X del tweet
        tweetBorrar = tweet.substring(0, tweet.length - 1);
        tweets = obtenerTweetLocalStorage();
        tweets.forEach(function(tweet){
            if(tweetBorrar === tweet){
                tweets.splice(index, 1)
            }

        });

localStorage.setItem('tweets', JSON.stringify(tweets)); 
   }

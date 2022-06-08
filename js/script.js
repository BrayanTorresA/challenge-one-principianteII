const html = document.querySelector("html");
const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

var $seccionInicio = document.querySelector("#section-inicio");
var $seccionNuevaPalabra = document.querySelector("#section-nueva-palabra");
var $seccionJuego = document.querySelector("#section-juego");

var $pantalla = document.querySelector("#pantalla");

function first() {
    menuPrincipal()
    setTimeout(() => {
        $pantalla.classList.remove("pantalla-inicial");
    }, 1000);
}

function menuPrincipal(){

    main.classList.add("flex-col-center");
    main.classList.remove("flex-col-start");

    $seccionInicio.style.display = "flex";
    $seccionJuego.style.display = "none";
    $seccionNuevaPalabra.style.display = "none";

    const buttonPlayGame = document.querySelector("#play-game");
    const buttonAddWord = document.querySelector("#agregar-nueva-palabra");

    buttonPlayGame.addEventListener("click", function(){
        animation(crearTableroJuego);
    });
    buttonAddWord.addEventListener("click", function(){
        animation(anadirNuevaPalabra);
    });
}

function animation(varFunction){
    $pantalla.classList.add("screen-in")
    setTimeout(() => {
        varFunction()
    }, 500);
    setTimeout(() => {
        $pantalla.classList.remove("screen-in")
    }, 1000);
}

window.addEventListener("load", first)
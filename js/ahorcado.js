let keyWord, letrasRestantes, puntaje, finJuego, lineas, letraUsada, letrasErradas, letra, buscarInicio, indice;

var palabrasCorrectas = document.querySelector("#caja-palabras-correctas");
var palabrasErradas = document.querySelector("#caja-palabras-erradas");

var botonNuevoJuego = document.querySelector("#nuevo-juego");
var botonRendirse = document.querySelector("#rendirse");

var palabraSecreta = document.querySelector("#caja-palabra-secreta");
var mensajeFinal = document.querySelector("#caja-mensaje-final");

var listaPalabras = ["ALURA", "ORACLE","JAVASCRIPT","PYTHON","ALGORITMO", "DATO","PROGRAMACION"];

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

botonNuevoJuego.addEventListener("click", function(){
    animation(crearTableroJuego);
});

botonRendirse.addEventListener("click", function(){
    animation(menuPrincipal);
});


function crearTableroJuego(){
    main.classList.add("flex-col-start");
    main.classList.remove("flex-col-center");

    $seccionInicio.style.display = "none";
    $seccionJuego.style.display = "flex";
    $seccionNuevaPalabra.style.display = "none";
    // Escoge una palabra al azar y reinicia los valores
    keyWord = escogerPalabra();
    letrasRestantes = keyWord.length;
    puntaje = 0;
    finJuego = false;
    letraUsada = [];
    letrasErradas = [];
    mensajeFinal.style.display = "none";
    palabraSecreta.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dibujarAhorcado(puntaje);
    dibujarLineas();

    lineas = document.querySelectorAll(".underscore");
    // Escucha eventos del teclado
    window.addEventListener("keydown", checkKeyfromPC);
}

function escogerPalabra(){
    return listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
}

function dibujarLineas(){
    palabrasCorrectas.innerHTML = "";
    palabrasErradas.innerHTML = "&nbsp;";
    for(let i=0; i<keyWord.length; i++){
        let div = document.createElement("div");
        div.classList.add("underscore");
        div.classList.add("flex-col-center");
        palabrasCorrectas.appendChild(div);
    }
}

function dibujarAhorcado(puntaje){
    ctx.beginPath();
    ctx.lineWidth = 6;
    switch(puntaje) {
        case 0:
            // BASE
            ctx.moveTo(25, 350);
            ctx.lineTo(325, 350);
            // COL
            ctx.moveTo(105, 0);
            ctx.lineTo(105, 350);
            // VIGA
            ctx.moveTo(257, 3);
            ctx.lineTo(103, 3);
            // CUERDA
            ctx.moveTo(255, 0);
            ctx.lineTo(255, 50);
            break;
        case 1:
            // CABEZA
            ctx.arc(255, 80, 30,2*Math.PI,0)
            break;
        case 2:
            // TORSO
            ctx.moveTo(255, 185);
            ctx.lineTo(255, 110);
            break;
        case 3:
            // PI_I
            ctx.moveTo(275, 230);
            ctx.lineTo(255, 185);
            break;
        case 4:
            // PI_D
            ctx.moveTo(235, 230);
            ctx.lineTo(255, 185);
            break;
        case 5:
            // BR_I
            ctx.moveTo(275, 170);
            ctx.lineTo(255, 120);
            break;
        case 6:
            // BR_D
            ctx.moveTo(235, 170);
            ctx.lineTo(255, 120);
            break;
    }
    ctx.stroke();
}



function verificarLetra(){
    // comprobar que no se haya usado esa letra
    if(!letraUsada.includes(letra)){
        buscarInicio = 0;
        indice = keyWord.indexOf(letra, buscarInicio)
        // comprobar que la letra se muestre en la palabra
        if(indice != -1){
            console.log();
            letraUsada.push(letra);
            while(indice != -1){
                letrasRestantes--;
                lineas[indice].textContent = letra;
                buscarInicio = indice +1;
                indice = keyWord.indexOf(letra, buscarInicio);
            }
        }else{
            console.log();
            letraUsada.push(letra);
            letrasErradas.push(letra);
            palabrasErradas.textContent = letrasErradas.join(' ');
            puntaje++;
            dibujarAhorcado(puntaje);
        }
        jugadorGano();
    }
}

function checkKeyfromPC(event){
    if(!finJuego){
        // comprobar que no haya perdido y que la tecla presionada sea una letra
        if(event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode == 192){
            letra = (event.key).toUpperCase();
            verificarLetra();
            let letraDiv = document.querySelector("#"+letra);
        }
    }
}



function jugadorGano(){
    if(letrasRestantes == 0){
        mensajeFinJuego(gano=true, keyWord);
        finJuego = true;
    } else if (puntaje == 6){
        mensajeFinJuego(gano=false, keyWord);
        finJuego = true;
    }    
}

function mensajeFinJuego(gano){
    mensajeFinal.style.display = "flex";
    if(gano){
        mensajeFinal.classList.remove("perder");
        mensajeFinal.classList.add("ganar");
        mensajeFinal.textContent = `¡FELICIDADES GANASTE! 😄`;
    } else {
        mensajeFinal.classList.remove("ganar");
        mensajeFinal.classList.add("perder");
        mensajeFinal.textContent = ` ¡FIN DEL JUEGO! 😭`;
        palabraSecreta.style.display = "flex";
        palabraSecreta.textContent = `La palabra secreta era: ${keyWord}`;
    }
}


// funcionamiento de input y botones de pantalla Agregar Nueva Palabra
var $inputText = document.querySelector("#input-nueva-palabra");
var $confirmPalabra = document.querySelector("#confirmar-nueva-palabra");
var $botonGuardar = document.querySelector("#guardar-nueva-palabra");
var $botonCancelar = document.querySelector("#cancelar-nueva-palabra");

function anadirNuevaPalabra(){
    
    $seccionInicio.style.display = "none";
    $seccionJuego.style.display = "none";
    $seccionNuevaPalabra.style.display = "flex";

    main.classList.remove("flex-col-start");
    main.classList.add("flex-col-center");

    $confirmPalabra.innerHTML = "";
    $confirmPalabra.classList.remove("alerta-roja");
    $confirmPalabra.classList.remove("alerta-azul");
    $inputText.value = "";
    let tempInput = "";
    let expresion = /[A-Z]/i;

    $inputText.addEventListener("input", (e) => {  
        if(e.data == null){
        } 
        else if(expresion.test(e.data)){
            tempInput = $inputText.value
        } else {
            $inputText.value = tempInput
        }
    })
}

$botonCancelar.addEventListener("click", function(){
    animation(crearTableroJuego);
});

$botonGuardar.addEventListener("click", function(){    
    $confirmPalabra.textContent = "";
    $confirmPalabra.classList.remove("alerta-roja");
    $confirmPalabra.classList.remove("alerta-azul");
    setTimeout(() => {
        if($inputText.value != ""){
            if($inputText.value.length <= 8){
                listaPalabras.push(($inputText.value).toUpperCase())
                $confirmPalabra.textContent = `Agregaste correctamente la palabra: ${($inputText.value).toUpperCase()} 👍`;
                $confirmPalabra.classList.remove("alerta-roja");
                $confirmPalabra.classList.add("alerta-azul");
                $inputText.value = "";
            } else {
                $confirmPalabra.textContent = `La palabra supera las 8 letras  permitidas 👎`;
                $confirmPalabra.classList.add("alerta-roja");
                $confirmPalabra.classList.remove("alerta-azul");
                $inputText.value = "";
            }
        }
    }, 1);
});
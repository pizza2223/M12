// Variables del juego
const game = document.getElementById('game');
const personaje = document.getElementById('personaje');
const imagenPersonaje = document.getElementById('imagenPersonaje');
let leftPos = 630;
let topPos = 600;
let arrayCamino;
let intervalId = null;
let juegoEnCurso = true;
let direction = 'up'; // dirección default

// Variables de puntuación
let vidas = 3;
let puntosVidas = 6;
let puntosObjetos = 0;
let puntosTiempo;
const puntosTiempoMax = 13;
const puntosXsegundo = 0.5;

// Variables del temporizador
let gameTimer; // intervalo de tiempo
let tiempoTranscurrido = 0;
let colisionConObjeto = false;


//Puntuación
document.getElementById("puntuacionVidas").innerHTML = puntosVidas;
document.getElementById('puntuacionObjetos').innerHTML = puntosObjetos;
document.getElementById("puntuacionTiempo").innerHTML = 13;

// Inicialización y configuración
iniciarTemporizador();
crearMapa();
actualizarPosicionPersonaje();
actualizarVidas();

spawnObjeto("/M12/L2/Kenia/images/objetos/piedra.png");
spawnObjeto("/M12/L2/Kenia/images/objetos/paloBuenoB.png");
spawnObjeto("/M12/L2/Kenia/images/objetos/placasolarBuenaB.png");

inicioMovimientoAutomaticoPersonaje(); // que se mueva desde el principio
cambioDeDireccionPersonaje();

// Funciones de puntuación
function calcularPuntuacionFinal() {
  const sumaPuntos = puntosObjetos + puntosTiempo + puntosVidas;
  document.getElementById('sumaPuntos').innerHTML = sumaPuntos + '/25';
  document.cookie = "puntos=" + sumaPuntos + ";  path=/;";

}

function iniciarTemporizador() {
  document.getElementById('temporizador').innerHTML = "[ " + tiempoTranscurrido + " segundos  ] ";
  gameTimer = setInterval(() => {
    tiempoTranscurrido++;

    puntosTiempo = Math.max(puntosTiempoMax - Math.floor(puntosXsegundo * tiempoTranscurrido), 0);
    document.getElementById("puntuacionTiempo").innerHTML = puntosTiempo;

    document.getElementById('temporizador').innerHTML = "[ " + tiempoTranscurrido + " segundos  ]";
  }, 1000);
}


function detenerTemporizador() {
  clearInterval(gameTimer);
}


function actualizarVidas() {
  imagenPersonaje.src = "/M12/L2/Kenia/images/personaje/personajeDetras.gif";
  for (let i = 1; i <= 3; i++) {
    const heart = document.getElementById(`heart${i}`);
    if (i <= vidas) {
      heart.src = "/M12/L2/Kenia/images/corazones/corazonPixel-entero.png";
    } else {
      heart.src = "/M12/L2/Kenia/images/corazones/corazonPixel-vacio.png";
    }
  }
  perder();
}

// Funciones de ganar y perder
function ganar() {
  if (leftPos === 0) {
    detenerTemporizador();
    calcularPuntuacionFinal();
    popupFuncion('ganar');
  }
}

function perder() {
  if (vidas === 0) {
    detenerTemporizador();
    popupFuncion('perder');
  }
}


function popupFuncion(resultado) {
  juegoEnCurso = false;

  const popup = document.getElementById('popup');
  popup.style.display = 'block';

  const popupContent = document.getElementById('popupContent');

  if (resultado === 'ganar') {

    popupContent.innerHTML = document.getElementById('ganar').innerHTML;
  } else if (resultado === 'perder') {

    popupContent.innerHTML = document.getElementById('perder').innerHTML;
  }

  const botones = popupContent.querySelectorAll('button');
  botones.forEach((boton) => {
    boton.addEventListener('click', (event) => {
      const accion = event.target.getAttribute('data-action');
      if (accion === 'volver') {
        location.reload();
      } else if (accion === 'reiniciar') {
        location.reload();
      }
    });
  });
}

// Funciones de mapa
function crearMapa() {
  arrayCamino = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0]
  ];

  for (let i = 0; i < arrayCamino.length; i++) {
    for (let j = 0; j < arrayCamino[i].length; j++) {
      if (arrayCamino[i][j] === 1) {

        let caminoDiv = document.createElement('div');
        caminoDiv.className = 'camino';
        //ajustar las posiciones 
        caminoDiv.style.top = i * 80 + 'px';
        caminoDiv.style.left = j * 100 + 'px';
        game.appendChild(caminoDiv);
      }
    }
  }
}

// Funciones de personaje
function actualizarPosicionPersonaje() {
  ganar();
  comprobarColisionObjetoPersonaje();
  //posición personaje
  personaje.style.left = leftPos + 'px';
  personaje.style.top = topPos + 'px';

  comprobarPersonajeDentroCamino();

}

function inicioMovimientoAutomaticoPersonaje() {
  if (juegoEnCurso && vidas > 0) {
    intervalId = movimiento('up', 10);
  }
}

function movimiento(direction, step) {
  return setInterval(() => {
    if (direction === 'left' && leftPos > 0) {
      leftPos -= step;
    } else if (direction === 'right') {
      leftPos += step;
    } else if (direction === 'up') {
      topPos -= step;
    } else if (direction === 'down' && topPos < 600) {
      topPos += step;
    }
    actualizarPosicionPersonaje();


  }, 65); //VELOCIDAD  PONER A 80 LUEGO
}


function cambioDeDireccionPersonaje() {
  document.addEventListener('keydown', (event) => {
    if (juegoEnCurso) {

      // Detener el intervalo anterior antes de comenzar uno nuevo
      clearInterval(intervalId);

      switch (event.key) {
        case 'ArrowLeft':
          direction = 'left';
          intervalId = movimiento('left', 10);
          imagenPersonaje.src = "/M12/L2/Kenia/images/personaje/personajeIzquierda.gif";
          break;
        case 'ArrowRight':
          direction = 'right';
          intervalId = movimiento('right', 10);
          imagenPersonaje.src = "/M12/L2/Kenia/images/personaje/personajeDerecha.gif";
          break;
        case 'ArrowUp':
          direction = 'up';
          intervalId = movimiento('up', 10);
          imagenPersonaje.src = "/M12/L2/Kenia/images/personaje/personajeDetras.gif";
          break;
        case 'ArrowDown':
          direction = 'down';
          intervalId = movimiento('down', 10);
          imagenPersonaje.src = " /M12/L2/Kenia/images/personaje/personajeDelante.gif";
          break;
        default:
          // Si se presiona una tecla que no sea flecha, reiniciar el movimiento automático con la dirección actual
          if (direction) {
            intervalId = movimiento(direction, 10);
          }
          break;
      }


    }

  });
}

function comprobarPersonajeDentroCamino() {
  const personajeWidth = personaje.offsetWidth;
  const personajeHeight = personaje.offsetHeight;
  const leftTop = leftPos;
  const leftBottom = topPos;
  const rightTop = leftPos + personajeWidth;
  const rightBottom = topPos + personajeHeight;

  //1
  const topLeftColumn = Math.floor((leftTop - 10) / 100);
  const topLeftRow = Math.floor((leftBottom - 10) / 80);
  //2
  const topRightColumn = Math.floor((rightTop) / 100);
  const topRightRow = Math.floor((leftBottom - 10) / 80);
  //3
  const bottomLeftColumn = Math.floor((leftTop - 10) / 100); 
  const bottomLeftRow = Math.floor((rightBottom - 10) / 80); 
  //4
  const bottomRightColumn = Math.floor((rightTop - 10) / 100);
  const bottomRightRow = Math.floor((rightBottom - 10) / 80);

  //blocked si la posición en la array es 0
  const topLeftIsBlocked = arrayCamino[topLeftRow][topLeftColumn] === 0;
  const topRightIsBlocked = arrayCamino[topRightRow][topRightColumn] === 0;
  const bottomLeftIsBlocked = arrayCamino[bottomLeftRow][bottomLeftColumn] === 0;
  const bottomRightIsBlocked = arrayCamino[bottomRightRow][bottomRightColumn] === 0;

  if (topLeftIsBlocked || topRightIsBlocked || bottomLeftIsBlocked || bottomRightIsBlocked) {
    clearInterval(intervalId);

    vidas = vidas - 1;
    puntosVidas = puntosVidas - 2;
    document.getElementById("puntuacionVidas").innerHTML = puntosVidas;
    actualizarVidas();
    inicioMovimientoAutomaticoPersonaje();

    //restablece la posición
    leftPos = 630;
    topPos = 600;
    actualizarPosicionPersonaje();

  }


}

// Funciones de objetos
function generarPosicionAleatoriaObjeto() {
  const randomX = Math.floor(Math.random() * 8);
  const randomY = Math.floor(Math.random() * 8);
  const objetoLeft = randomY * 100;
  const objetoTop = randomX * 80;
  return { objetoLeft, objetoTop };
}

function spawnObjeto(imagenSrc) {
  const imagenObjeto = document.createElement('img');
  imagenObjeto.src = imagenSrc;

  let posicionValida = false;

  while (!posicionValida) {
    const { objetoLeft, objetoTop } = generarPosicionAleatoriaObjeto();

    if (!comprobarObjetoDentroCamino(objetoLeft, objetoTop, imagenObjeto)) {
      // Si la posición es válida y no hay colisiones con otros objetos, salir del bucle
      posicionValida = true;

      const contenedorImagen = document.createElement('div');
      contenedorImagen.style.position = 'absolute';
      contenedorImagen.style.zIndex = 3;
      contenedorImagen.style.left = objetoLeft + 'px';
      contenedorImagen.style.top = objetoTop + 'px';
      contenedorImagen.appendChild(imagenObjeto);
      contenedorImagen.classList.add('objeto');
      game.appendChild(contenedorImagen);
    }
  }


  imagenObjeto.haColisionado = false;
}



function comprobarObjetoDentroCamino(objetoLeft, objetoTop, imagenObjeto) {
  const objetoTopLeftRow = Math.floor(objetoTop / 80);
  const objetoTopLeftColumn = Math.floor(objetoLeft / 100);

  const objetoTopRightRow = Math.floor(objetoTop / 80);
  const objetoTopRightColumn = Math.floor((objetoLeft + imagenObjeto.offsetWidth) / 100);

  const objetoBottomLeftRow = Math.floor((objetoTop + imagenObjeto.offsetHeight) / 80);
  const objetoBottomLeftColumn = Math.floor(objetoLeft / 100);

  const objetoBottomRightRow = Math.floor((objetoTop + imagenObjeto.offsetHeight) / 80);
  const objetoBottomRightColumn = Math.floor((objetoLeft + imagenObjeto.offsetWidth) / 100);

  const esquinasBloqueadas =
    arrayCamino[objetoTopLeftRow][objetoTopLeftColumn] === 0 ||
    arrayCamino[objetoTopRightRow][objetoTopRightColumn] === 0 ||
    arrayCamino[objetoBottomLeftRow][objetoBottomLeftColumn] === 0 ||
    arrayCamino[objetoBottomRightRow][objetoBottomRightColumn] === 0;

  return esquinasBloqueadas;
}



function comprobarColisionObjetoPersonaje() {

  const personajeWidth = personaje.offsetWidth;
  const personajeHeight = personaje.offsetHeight;
  const leftTop = leftPos;
  const leftBottom = topPos;
  const rightTop = leftPos + personajeWidth;
  const rightBottom = topPos + personajeHeight;

  const objetos = document.querySelectorAll('.objeto');

  objetos.forEach((objeto) => {
    if (!objeto.haColisionado) {
      const objetoWidth = objeto.offsetWidth;
      const objetoHeight = objeto.offsetHeight;
      const objetoLeft = parseInt(objeto.style.left);
      const objetoTop = parseInt(objeto.style.top);

      if (
        leftTop < objetoLeft + objetoWidth &&
        rightTop > objetoLeft &&
        leftBottom < objetoTop + objetoHeight &&
        rightBottom > objetoTop
      ) {
        // Colisión con el objeto
        puntosObjetos += 2;
        document.getElementById('puntuacionObjetos').innerHTML = puntosObjetos;
        objeto.remove();

        objeto.haColisionado = true;
      }
    }
  });
}

//Funciones de redirección
function volverAlMapa() {
  window.location.href = "../../controllers_php/updatePuntosController.php";
}

function juego() {
  window.location.href = 'juego.html';
}

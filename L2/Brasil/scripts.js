//////////////////////////////////////////////////////////////////
//Pantalla de primer visita
function escribirEnPantalla(texto, callback) {
  let arr = texto.split("");
  let i = 0;
  let elemento = document.getElementById("laiadialogo");
  elemento.innerHTML = "";  // Limpiar el contenido antes de empezar

  let intervalo = setInterval(function () {
      if (i == arr.length - 1) {
          elemento.innerHTML += arr[i];
          clearInterval(intervalo);
          // Llama a la función de callback después de la animación
          if (callback) {
              callback();
          }
      } else {
          if (arr[i] == " ") {
              elemento.innerHTML += arr[i];
              elemento.innerHTML += arr[i + 1];
              i += 2;
          } else {
              elemento.innerHTML += arr[i];
              i++;
          }
      }
  }, 130);
}

escribirEnPantalla("¡Hola Laia! Soy Caucan Miri de la tribu Tatuyo   ", function () {
  escribirEnPantalla("Te hemos contratado para contar la cantidad total de niños que hay en la escuela", function () {
      escribirEnPantalla("Vas a tener que apretar la tecla espacio cada vez que veas uno", function () {
        escribirEnPantalla("Si al acabar el juego los has contado correctamente ganarás.", function () {
          escribirEnPantalla("Y...¡Cuidado, encontrarás obstáculos en tu camino!", function () {
        });      });
      });
  });
});


//////////////////////////////////////////////////////////////
//Funciones generales

function reproducirAudio(ruta, volumen) {
  try {
    const audio = new Audio(ruta);
    audio.volume = volumen;
    audio.play();
  } catch (error) {
    console.error("Error al reproducir audio:", error);
  }
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return "";
}

window.onload = function () {//Al cargar

  checkFirstVisit();

  var nivelGuardado = getCookie("Nivel");
  if (nivelGuardado !== "") {
    nivel = parseInt(nivelGuardado);
    document.getElementById('nivel').innerText = "Nivel: " + nivel;

    document.getElementById('nivel-inicio').innerText = "Nivel: " + nivel;
  }

   var tiempoGuardado = getCookie("Tiempo(segundos)");
  if (tiempoGuardado !== "") {
    document.getElementById('tiempoinicio').innerText = "Tiempo(seg): " + tiempoGuardado;
  }

  var puntosGuardados = getCookie("puntos");
  if (puntosGuardados !== "") {
    document.getElementById('puntostexto').innerText = 'Puntos: ' + puntosGuardados+' /25' ;
    document.getElementById('puntostexto2').innerText = 'Puntos: ' + puntosGuardados+' /25' ;

  }
};


function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}


function checkFirstVisit() {
  var introDiv = document.getElementById('intro');
  var juegoDiv = document.getElementById('all');

  var visited = getCookie('visited');

  if (visited) {
    introDiv.style.display = 'none';
    juegoDiv.style.display = 'block';

  } else {
    introDiv.style.display = 'relative';
    setCookie('visited', 'true', 365); 
  }
}

///////////////////////////////////////////////////////////
var nivel = 1;
var targetSquares;
let counter = 0;
let elapsedTime; 
let timer; // Variable d el temporizador
var squares = document.getElementsByClassName('square');
document.getElementById('nivel').innerText = "Nivel: " + nivel;


function resetCounter() {
  counter = 0;
  document.getElementById('counter').innerText = counter;
}


document.getElementById('finjuego').style.display = 'none';
document.getElementById('comenzarJuego').addEventListener('click', inicializa);
document.getElementById('all').style.display = 'none';

function postintro() {
  document.getElementById('intro').style.display = 'none'; 
  document.getElementById('all').style.display = 'block'; 
  reproducirAudio("audio/inicio.mp3", 1);
}

var startTime = 0;

function inicializa() {
  inicializarCookies();
  iniciarTimer();
  ocultarElementos();
  resetearContador();
  generacionEntidades();
  marcarTiempoInicial();
  configurarEventos();
  reproducirSonidoDeFondo();
}

function inicializarCookies() {
  setCookie("Tiempo(segundos)", 0, 1);
}

function iniciarTimer() {
  startTimer();
}

function ocultarElementos() {
  document.getElementById('inicioJuego').style.display = 'none';
  document.getElementById('game').style.zIndex = 1;
  document.getElementById('finjuego').style.display = 'none';
}

function resetearContador() {
  counter = 0;
  document.getElementById('counter').innerText = counter;
}

function marcarTiempoInicial() {
  startTime = Date.now();
}

function configurarEventos() {
  document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
      aumentarContador();
    }
  };
}

function aumentarContador() {
  counter++;
  document.getElementById('counter').innerText = counter;

  if (counter === targetSquares) {
    finalizarJuego();
  }
}

function finalizarJuego() {
  elapsedTime = (Date.now() - startTime) / 1000;
  setCookie("Tiempo(segundos)", elapsedTime.toFixed(2), 1);
  setCookie("Nivel", nivel, 1);
  actualizarElementosFinJuego();
}

function actualizarElementosFinJuego() {
  document.getElementById('nivel-inicio').innerText = "Nivel: " + nivel;
  document.getElementById('tiempoinicio').innerText = "Tiempo: " + elapsedTime.toFixed(2) + " segundos";
}

function reproducirSonidoDeFondo() {
  reproducirAudio("audio/gameback.mp3", 0.2);
}


function reiniciarnivel(){
  setCookie("Nivel", (nivel-1), 1);
}

function reiniciarYRecargar() {
  reiniciarnivel();
  location.reload();
}

var puntostext = document.getElementsByClassName('puntostexto');
var tiempojuego =16000;
function startTimer() {
  var resultado = document.getElementById('ganarperder');
  var tiempotext = document.getElementById('tiempottexto');
  var tiempoinicio = document.getElementById('tiempoinicio');
  var puntos;

  function resetTimer() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null; // Restablece la variable timer
    }
  }

  function Ganar() {
    reproducirAudio("audio/ganar.mp3", 0.5);
    resultado.innerText = '¡ Ganaste !';
    resultado.style.color = "#00E01F";
    document.getElementById('finjuego').style.display = 'block';
    tiempotext.innerText = 'Tiempo: ' + elapsedTime.toFixed(2) + ' (seg).';
    var totalenchufes= targetSquares/5;
    document.getElementById('niñostotalfin').innerText = 'Necesitaremos: ' + Math.ceil(totalenchufes)+' enchufes.';
    updateScore();
  }

  function Perder() {
    reproducirAudio("audio/perder.mp3", 1);
    nivel++;
    document.getElementById('siguienteJuego').style.display = 'none';
    setCookie("puntos", "0", 1);
    resultado.innerText = '¡Perdiste!';
    resultado.style.color = 'red';
    document.getElementById('finjuego').style.display = 'block';
    document.getElementById('puntostexto').innerText = 'Puntos: ' + "0";
    document.getElementById('puntostexto2').innerText = 'Puntos: ' + "0";
    document.getElementById('niñostotalfin').innerText = 'Número total de niños: ' + targetSquares;
    setCookie("Tiempo(segundos)", "No alcanzado", 1);
    tiempotext.innerText = 'Tiempo: No alcanzado.';
  }

  function updateScore() {
    puntos = calculatePoints();
    setCookie("puntos", puntos, 1);
    document.getElementById('puntostexto').innerText = 'Puntos: ' + puntos;
    document.getElementById('puntostexto2').innerText = 'Puntos: ' + puntos;
    counter = 0;
    squares = [];
    nivel++;
    tiempojuego = tiempojuego + 7559;
    setCookie("Nivel", nivel, 1);
    document.getElementById('nivel').innerText = "Nivel: " + nivel;
    document.getElementById('contador').innerText = "Contador: " + counter;
  }

  function calculatePoints() {
    switch (true) {
      case nivel >= 3 && elapsedTime < 15:
        return 25;
      case nivel < 3 && elapsedTime < 5:
        return 25;
      case nivel < 3 && elapsedTime >= 5 && elapsedTime <= 8:
        return 20;
      case nivel < 3 && elapsedTime > 8 && elapsedTime <= 12:
        return 15;
      case nivel < 3 && elapsedTime > 12 && elapsedTime <= 50:
        return 10;
      default:
        return 0;
    }
  }

  resetTimer();
  timer = setTimeout(function () {
    if (counter == targetSquares) {
      Ganar();
    } else {
      Perder();
    }
  }, tiempojuego);
}

 let intervalNiños;
 let intervalmonos;

function pantallasiguiente() {
  setCookie("Tiempo(segundos)",0,1);
  startTime = Date.now(); // Marca de tiempo inicial

  detenerGeneracion();
  let elemento = document.getElementById("laiadialogo");
  elemento.innerHTML = "";
counter = 0;

if (counter === targetSquares) {
  elapsedTime = (Date.now() - startTime) / 1000;
  setCookie("Tiempo(segundos)", elapsedTime.toFixed(2), 1);
  setCookie("Nivel", nivel, 1);
  document.getElementById('nivel-inicio').innerText = "Nivel: " + nivel;
  document.getElementById('tiempoinicio').innerText = "Tiempo: " + elapsedTime.toFixed(2) + " segundos";
}

  generacionEntidades();
  // Detiene el temporizador al pasar a la pantalla siguiente
  clearTimeout(timer);
  timer = null;
  document.getElementById('finjuego').style.display = 'none';
  document.getElementById('game').style.zIndex = 1;
  // Inicia un nuevo temporizador y resetea el contador

  if (timer === null) {
    startTimer();
    resetCounter();
  }
}

function detenerGeneracion() {
  // Detiene la generación de cuadrados
  clearInterval(intervalNiños);
  clearInterval(intervalmonos);

  document.getElementById('game').innerHTML = '';
}

function generacionEntidades() {
  targetSquares = nivel * getRandomNumber(4, 8);
  var areadelJuegoDiv = document.querySelector('.areadelJuego');
  var areadelJuegoHeight = areadelJuegoDiv.offsetHeight;// esto pilla la altura en pixeles del div
  var squares = document.getElementsByClassName('square');
  var square;
  var img;
  var imgm;
  let monos = [];
  let nuevoMono;

  intervalNiños = setInterval(function niños() {
  
    if (squares.length >= targetSquares) {
      clearInterval(intervalNiños);
      return;
    }
  
      square = document.createElement('div');
      square.className = 'square';
  
      img = document.createElement('img');
      img.src = 'imagenes/walking.gif';
      square.appendChild(img);
  
      // Altura aleatoria
      var randomTop = Math.floor(Math.random() * areadelJuegoHeight);
      if (randomTop > areadelJuegoHeight - 50) {
        randomTop -= 50;
      }
      square.style.top = randomTop + 'px';
      // Animación
      square.style.animation = 'move linear ' + (Math.random() * 4 + 4) + 's';
      
      document.getElementById('game').appendChild(square);

    }, 1000 ); // Crea un nuevo cuadrado cada segundo/nivel
  
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    } 



//esto es el codigo de aparicion de los monos
intervalmonos = setInterval(function generarMonos() {
  if (monos.length >= 8) {
    clearInterval(intervalmonos);
    return;
  }

  nuevoMono = document.createElement('div');
  nuevoMono.className = 'mono';
  imgm = document.createElement('img');
  imgm.className = 'imgm';
  imgm.src = 'imagenes/mono2.gif';
  nuevoMono.appendChild(imgm);

  // Altura aleatoria
  var randomTop = Math.floor(Math.random() * areadelJuegoHeight);
  //  el cuadrado  completamente dentro 
  if (randomTop > areadelJuegoHeight - 50) {
    randomTop -= 50;
  }
  nuevoMono.style.top = randomTop + 'px';
  nuevoMono.style.animation = 'move linear ' + (Math.random() * 5 + 5) + 's';
  monos.push(nuevoMono);
  document.getElementById('game').appendChild(nuevoMono);
}, 1000); // Crea un nuevo cuadrado cada segundo
};

var juegoPausado = false;

function pausarJuego() {
  juegoPausado = !juegoPausado;

  var gameBoxPause = document.getElementsByClassName('gameBoxPause')[0];

  if (juegoPausado) {
    detenerGeneracion();
    clearInterval(intervalNiños);
    clearInterval(intervalmonos);
    clearTimeout(timer);
    document.getElementById('pausaBtn').innerText = '';
    pausaBtn.style.backgroundImage = 'url(imagenes/pausa.png)';
    gameBoxPause.style.display = 'block';
  } else {
    generacionEntidades();
    startTimer();
    document.getElementById('pausaBtn').innerText = '';
    pausaBtn.style.backgroundImage = 'url(imagenes/resume.png)';
    gameBoxPause.style.display = 'none';
  }
}



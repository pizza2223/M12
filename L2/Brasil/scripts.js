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

// Primer llamado con una función de retorno de llamada
escribirEnPantalla("¡Hola Laia! Soy Caucan Miri de la tribu Tatuyo   ", function () {
  escribirEnPantalla("Te hemos contratado para contar la cantidad total de niños que hay en la escuela", function () {
      escribirEnPantalla("Vas a tener que apretar la tecla espacio cada vez que veas uno", function () {
        escribirEnPantalla("Si al acabar el juego los has contado correctamente ganarás.", function () {
          escribirEnPantalla("Y...¡Cuidado, encontrarás obstáculos en tu camino!", function () {
            // Puedes seguir encadenando llamadas para más textos si es necesario
        });      });
      });
  });
});
function reproducirAudio(ruta, volumen) {
  var audio = new Audio(ruta);
  audio.volume = volumen; // Establecer el volumen
  audio.play();
}



//////
var nivel = 1;
var targetSquares;

document.getElementById('nivel').innerText = "Nivel: " + nivel;

let counter = 0;
let elapsedTime; // Declarar la variable elapsedTime aquí

function resetCounter() {
  counter = 0;
  document.getElementById('counter').innerText = counter;
}

var squares = document.getElementsByClassName('square');

document.getElementById('finjuego').style.display = 'none';
let timer; // Variable para el temporizador

document.getElementById('comenzarJuego').addEventListener('click', inicializa);
document.getElementById('all').style.display = 'none'; // Oculta la ventana de inicio

function postintro() {
  document.getElementById('intro').style.display = 'none'; // Oculta la ventana de inicio
  document.getElementById('all').style.display = 'block'; // Oculta la ventana de inicio
  reproducirAudio("audio/inicio.mp3", 1);

}

function inicializa() {

  startTimer();

  let startTime = Date.now(); // Marca de tiempo inicial
  counter = 0; // Variable para contar cuántas veces se presiona la tecla espacio
  

  document.getElementById('inicioJuego').style.display = 'none'; // Oculta la ventana de inicio
  document.getElementById('game').style.zIndex = 1; // Hace que el juego aparezca encima de la ventana de inicio
  document.getElementById('finjuego').style.display = 'none'; // Oculta la ventana de inicio
  resetCounter();
  generacionEntidades();
  var gameStarted = false;
  
  document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
      counter++;
      document.getElementById('counter').innerText = counter;

      if (counter === targetSquares) {
        // Calcular el tiempo transcurrido en segundos
        elapsedTime = (Date.now() - startTime) / 1000;
        document.cookie = "Tiempo(segundos)=" + elapsedTime.toFixed(2);
        document.cookie = "Nivel=" + nivel;

        // Mostrar una alerta indicando el segundo exacto
      }
    }
  };
  reproducirAudio("audio/gameback.mp3", 0.2);

}
function startTimer() {
  // Selecciona el primer elemento h2
  var resultado = document.getElementById('ganarperder');
  var tiempotext = document.getElementById('tiempottexto');
  var puntostext = document.getElementById('puntostexto');
  var tiempoinicio = document.getElementById('tiempoinicio');

  var puntos;

  // Detiene el temporizador anterior (si existe)
  clearTimeout(timer);

  // Inicia un nuevo temporizador
  timer = setTimeout(function () {
    if (counter == targetSquares) {
      reproducirAudio("audio/ganar.mp3", 0.5);

      resultado.innerText = '¡Ganaste!';
      resultado.style.color = 'green';
      document.getElementById('finjuego').style.display = 'block';
      tiempotext.innerText = 'Tiempo: ' + elapsedTime.toFixed(2) + ' segundos.';
      console.log(tiempotext.innerText);

      tiempoinicio.innerText = tiempotext.innerText; 
      switch (true) {
        case elapsedTime < 5:
          puntos = 25;
          break;
        case elapsedTime >= 5 && elapsedTime <= 8:
          puntos = 20;
          break;
        case elapsedTime > 8 && elapsedTime <= 12:
          puntos = 15;
          break;
        case elapsedTime > 12 && elapsedTime <= 16:
          puntos = 10;
          break;
        default:
          puntos = 0;
      }

      puntostext.innerText = 'Puntos: ' + puntos;
      document.cookie = "Juego="+ puntos;
      counter = 0;
      squares = []; // Reiniciar el arreglo de cuadrados completados
      nivel++;
      document.getElementById('nivel').innerText = "Nivel: " + nivel; // Actualiza el nivel en la pantalla
      document.getElementById('contador').innerText = "Contador: " + counter;
    } else {
      reproducirAudio("audio/perder.mp3", 1);
      console.log("pepe");

      document.cookie = "Juego="+0;
      resultado.innerText = '¡Perdiste!';
      resultado.style.color = 'red';
      document.getElementById('finjuego').style.display = 'block';
    }
  }, 16000);
}



 // 


 let intervalNiños;
function pantallasiguiente() {
  detenerGeneracion(); // Detiene la generación actual

  // Limpiar el contenido antes de empezar
  let elemento = document.getElementById("laiadialogo");
  elemento.innerHTML = "";

  // Generar nuevas entidades
  generacionEntidades();

  // Detiene el temporizador al pasar a la pantalla siguiente
  clearTimeout(timer);

  document.getElementById('finjuego').style.display = 'none';
  document.getElementById('game').style.zIndex = 1;

  // Inicia un nuevo temporizador y resetea el contador
  startTimer();
  resetCounter();
}

function detenerGeneracion() {
  // Detiene la generación de cuadrados
  clearInterval(intervalNiños);
  document.getElementById('game').innerHTML = '';

  // Detiene la generación de monos
}

function generacionEntidades() {
  targetSquares = nivel * getRandomNumber(4, 8);

  
  intervalNiños = setInterval(function niños() {
    var squares = document.getElementsByClassName('square');
  

    if (squares.length >= targetSquares) {
      clearInterval(intervalNiños);
      return;
    }
  
      var square = document.createElement('div');
      square.className = 'square';
  
      // Crear un nuevo elemento de imagen
      var img = document.createElement('img');
      img.src = 'imagenes/walking.gif';
      square.appendChild(img);
  
      var areadelJuegoDiv = document.querySelector('.areadelJuego');
      var areadelJuegoHeight = areadelJuegoDiv.offsetHeight;
  
      // Altura aleatoria
      var randomTop = Math.floor(Math.random() * areadelJuegoHeight);
      if (randomTop > areadelJuegoHeight - 50) {
        randomTop -= 50;
      }
      square.style.top = randomTop + 'px';
      // Animación
      square.style.animation = 'move linear ' + (Math.random() * 4 + 4) + 's';
      document.getElementById('game').appendChild(square);
  
      // Incrementar el contador
  
      // Comprobar si counter es igual a squares.length

    }, 1000 / Math.sqrt(nivel)); // Crea un nuevo cuadrado cada segundo/nivel
  
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }



//esto es el codigo de aparicion de los monos

setInterval(function mono() {
 var mono = document.getElementsByClassName('mono');

 // Si ya hay 8 cuadrados en la pantalla, no se crea uno nuevo
 if (mono.length >= 8) {
    return;
 }

 var mono = document.createElement('div');
 mono.className = 'mono';

 // Crear un nuevo elemento de imagen
 var imgm = document.createElement('img');
 imgm.className = 'imgm';
 imgm.src = 'imagenes/mono2.gif';
 mono.appendChild(imgm);

 var areadelJuegoDiv = document.querySelector('.areadelJuego');
 var areadelJuegoHeight = areadelJuegoDiv.offsetHeight;

 // Altura aleatoria
 var randomTop = Math.floor(Math.random() * areadelJuegoHeight);
 //  el cuadrado  completamente dentro 
 if (randomTop > areadelJuegoHeight - 50) {
    randomTop -= 50;
 }
 mono.style.top = randomTop + 'px';
 // Animación
 mono.style.animation = 'move linear ' + (Math.random() * 5 + 5) + 's';
 document.getElementById('game').appendChild(mono);
}, 1000); // Crea un nuevo cuadrado cada segundo

};

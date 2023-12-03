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
        });      });
      });
  });
});
function reproducirAudio(ruta, volumen) {
  var audio = new Audio(ruta);
  audio.volume = volumen; 
  audio.play();
}



//////
var nivel = 1;
var targetSquares;
let counter = 0;
let elapsedTime; 
let timer; // Variable para el temporizador
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

function inicializa() {

  startTimer();

  let startTime = Date.now(); // Marca de tiempo inicial
  counter = 0; 
  
  document.getElementById('inicioJuego').style.display = 'none'; 
  document.getElementById('game').style.zIndex = 1; 
  document.getElementById('finjuego').style.display = 'none';
  resetCounter();
  generacionEntidades();
  
  document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
      counter++;
      document.getElementById('counter').innerText = counter;

      if (counter === targetSquares) {
        elapsedTime = (Date.now() - startTime) / 1000;
        document.cookie = "Tiempo(segundos)=" + elapsedTime.toFixed(2);
        document.cookie = "Nivel=" + nivel;

      }
    }
  };
  reproducirAudio("audio/gameback.mp3", 0.2);

}
function startTimer() {
  var resultado = document.getElementById('ganarperder');
  var tiempotext = document.getElementById('tiempottexto');
  var puntostext = document.getElementById('puntostexto');
  var tiempoinicio = document.getElementById('tiempoinicio');
  var puntos;

  clearTimeout(timer);

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

    setCookie("puntos",puntos,1); 
      counter = 0;
      squares = []; // Reiniciar el arreglo de cuadrados completados
      nivel++;
      document.getElementById('nivel').innerText = "Nivel: " + nivel; // Actualiza el nivel en la pantalla
      document.getElementById('contador').innerText = "Contador: " + counter;
    } else {
      reproducirAudio("audio/perder.mp3", 1);


      document.cookie = "puntos="+0;
      resultado.innerText = '¡Perdiste!';
      resultado.style.color = 'red';
      document.getElementById('finjuego').style.display = 'block';
    }
  }, 16000);
}
function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}


 let intervalNiños;
 let intervalmonos;

function pantallasiguiente() {
  detenerGeneracion();
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
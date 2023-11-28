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
  escribirEnPantalla("Te hemos contratado para conatar la cantidad total de niños que hay en la escuela", function () {
      escribirEnPantalla("Vas a tener que apretar la tecla espacio cada vez que veas uno", function () {
        escribirEnPantalla("Si al acabar el juego los has contado correctamente ganaras.", function () {
          escribirEnPantalla("Y...¡Cuidado, encontraras obstaculos en tu camino!", function () {
            // Puedes seguir encadenando llamadas para más textos si es necesario
        });      });
      });
  });
});


//////
var nivel = 1;
 document.getElementById('nivel').innerText = "Nivel: " + nivel;

 let counter = 0; 

function resetCounter() {
 counter = 0
 document.getElementById('counter').innerText = counter;
}

var squares = document.getElementsByClassName('square');

document.getElementById('finjuego').style.display = 'none'; 
let timer; // Variable para el temporizador

document.getElementById('comenzarJuego').addEventListener('click',inicializa );
document.getElementById('all').style.display = 'none'; // Oculta la ventana de inicio

function postintro(){
    document.getElementById('intro').style.display = 'none'; // Oculta la ventana de inicio
    document.getElementById('all').style.display = 'block'; // Oculta la ventana de inicio

}

function inicializa() {
  let startTime = Date.now(); // Marca de tiempo inicial
  let counter = 0; // Variable para contar cuántas veces se presiona la tecla espacio

  startTimer();
  var audio = document.getElementById("audio");
  audio.play();
  document.getElementById('inicioJuego').style.display = 'none'; // Oculta la ventana de inicio
  document.getElementById('game').style.zIndex = 1; // Hace que el juego aparezca encima de la ventana de inicio
  document.getElementById('finjuego').style.display = 'none'; // Oculta la ventana de inicio
  resetCounter();
  generacionEntidades();
  var gameStarted = false;
  document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
      counter++;
      document.getElementById('counter').innerText = counter;

      if (counter === 5) {
        // Calcular el tiempo transcurrido en segundos
        let elapsedTime = (Date.now() - startTime) / 1000;

        // Mostrar una alerta indicando el segundo exacto
        alert('¡Counter es igual a la longitud de cuadrados en el segundo ' + elapsedTime.toFixed(2) + '!');
      }
    }
  };
}






var totalsq=5;
function startTimer() {
 // Detiene el temporizador anterior (si existe)
 clearTimeout(timer);
 
 // Inicia un nuevo temporizador
 timer = setTimeout(function() {
    if (counter == totalsq) {
      alert('ganaste');
      document.getElementById('finjuego').style.display = 'block'; 
      counter = 0;
      squares = []; // Reiniciar el arreglo de cuadrados completados
      nivel++;
      document.getElementById('nivel').innerText = "Nivel: " + nivel; // Actualiza el nivel en la pantalla
      document.getElementById('contador').innerText = "Contador: " + counter;
    } else if (counter == 0 || counter != squares.length) {
      document.getElementById('finjuego').style.display = 'block';
      alert('perdiste');
    }
 }, 16000);
}

 // 
clearTimeout(timer); // Detiene el temporizador anterior



function pantallasiguiente() {
 // Detiene el temporizador al pasar a la pantalla siguiente
 clearTimeout(timer);
 
 document.getElementById('finjuego').style.display = 'none'; 
 document.getElementById('game').style.zIndex = 1;
 generacionEntidades();
 startTimer(); // Inicia un nuevo temporizador
 resetCounter();
}

function generacionEntidades() {
  
    let niños = setInterval(function() {
      var squares = document.getElementsByClassName('square');
  
      if (squares.length >= 5) {
        clearInterval(niños);
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
      square.style.animation = 'move linear ' + (Math.random() * 5 + 5) + 's';
      document.getElementById('game').appendChild(square);
  
      // Incrementar el contador
  
      // Comprobar si counter es igual a squares.length

    }, 1000 / Math.sqrt(nivel)); // Crea un nuevo cuadrado cada segundo/nivel
  
  



//esto es el codigo de aparicion de los monos

setInterval(function() {
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
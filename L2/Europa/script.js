// Definición de constantes y variables globales

const character = document.getElementById('character');
const paredes = document.querySelectorAll('.pared');
const puertas = document.querySelectorAll('.puerta');
const flechas = document.querySelectorAll('.flecha');
const puertas1 = document.querySelectorAll('.puerta1');
const wasdDiv = document.getElementById('wasd');
const objetosInspeccionables = document.querySelectorAll('.inspeccionable');
const objetosConseguibles = document.querySelectorAll('.conseguible');
const objetosConseguidos = [];
let currentRoom = 1;
let indiceMensajeActual = 0;

let tiempoTranscurrido = 0; // Tiempo en segundos transcurridos
let contadorInterval; // Variable para almacenar el intervalo del contador
let puntos;


const mensajes = [
    "¡Hemos aterrizado en Barcelona!",
    "Estamos en una urbanización en las afueras de la ciudad.",
    "Estamos en una urbanización en las afueras de la ciudad.",
    "Nos han pedido ayuda para construir una granja eólica.",
    "Nos han pedido ayuda para construir una granja eólica.",
    "Tendremos que investigar el lugar, recaudar información...",
    "Tendremos que investigar el lugar, recaudar información...",
    "y encontrar los materiales necesarios para comenzar.",
    "y encontrar los materiales necesarios para comenzar.",
    "Tendremos que mirar cada zona con cuidado para... ",
    "Tendremos que mirar cada zona con cuidado para... ",
    "no dejarnos nada que nos resulte útil para la granja.",
    "no dejarnos nada que nos resulte útil para la granja.",
    "¡Empecemos!"

   
];
const mensajesObjetos = {
    libroMolinos: 'Es una guía de molinos de viento: debemos asegurarnos de que los molinos se sitúan cerca de una comunidad que pueda aprovecharlos.',
    libro1H5: 'Es un álbum de fotos.',
    llave: 'Bajo esta maceta habñia una llave. Quizás podamos abrir alguna puerta por ella',
    aerogenerador: '¡Hemos encontrado todos los materiales necesarios para contruir un aerogenerador!. Será pequeño pero para empezar nos bastará',
    bombilla: "Has encontrado una bombilla y la has guardado.",
    veleta: '¡Es una veleta! Este instrumento se utiliza para conocer la dirección del viento',
    botanica: 'Es una estantería con libros de botánica. Aquí pone que para plantar tomates se necesitan ocho horas de luz directa al día como mínimo. Creo que no nos será de ayuda.',
    penDrive: 'Hay un pen drive en el ordenador. Aquí está toda la información necesaria para montar y mantener un molino de viento',
    libroAire: 'Hay una libro de energía eólica: Antes de instalar un molino eólico es necesario analizar la dirección, tempratura y fuerza del aire. ¡Genial esto nos será útil',
    notaContrasenya: 'Hay una nota: el instrumento que sirve para medir la velocidad del viento se llama "anemómetro". Tal vez nos sea útil esta información en algún momento'
    
};


// Establecer posiciones iniciales en JavaScript
character.style.position = 'absolute';
character.style.left = '125px';
character.style.top = '300px';

// Función para inicializar el juego
function iniciarJuego() {
    
    mostrarMensaje(mensajes[indiceMensajeActual]);
    mostrarPantallaInicio(indiceMensajeActual);
    document.getElementById('siguienteBtn').addEventListener('click', mostrarSiguienteMensaje);    

    comenzarJuego();

    asignarEventListeners();
    manejarObjetos();
    const wasdDiv = document.getElementById('wasd');
    wasdDiv.style.display = currentRoom === 1 ? 'block' : 'none';
}

// Función para asignar event listeners

function reiniciarJuego(indiceMensajeActual) {
    // Restablece las variables y elementos a sus valores iniciales
    currentRoom = 1;
    nextRoom = 1;

    tiempoTranscurrido = 0;
    objetosConseguidos.length = 0; // Vacía el array de objetos conseguidos
    character.style.left = '500px';
    character.style.top = '675px';

    // Oculta todas las habitaciones excepto la primera
    for (let i = 1; i <= 9; i++) {
        const habitacion = document.getElementById(`habitacion${i}`);
        habitacion.style.display = i === 1 ? 'block' : 'none';
    }

    const pantallaInicial = document.getElementById('pantalla-inicial');
    pantallaInicial.style.display = 'flex'; // Cambia a flex para centrar vertical y horizontalmente
    pantallaInicial.style.alignItems = 'center'; // Centra verticalmente
    pantallaInicial.style.justifyContent = 'center'; // Centra horizontalmente

    const juegoContainer = document.getElementById('game-container');
    juegoContainer.style.display = 'none';
    
    const tiempo = document.getElementById('tiempo-container');
    tiempo.style.display = 'none';

    const casillasObjetos = document.getElementById('casillas-objetos-conseguidos');
    casillasObjetos.style.display = 'none';
    const imagenesCasillas = casillasObjetos.querySelectorAll('.casilla-objeto img');

    for (const imagenCasilla of imagenesCasillas) {
        imagenCasilla.remove();
    }

    const botonComenzar = document.getElementById('comenzarBtn');
        botonComenzar.style.display = 'none';

    // Muestra el botón "Siguiente"
    const botonSiguiente = document.getElementById('siguienteBtn');
        botonSiguiente.style.display = 'block';


    // Restablece el índice del mensaje actual
    indiceMensajeActual = 0;
    return indiceMensajeActual;
}

// Función para mostrar la pantalla de inicio
function mostrarPantallaInicio() {
    const juegoContainer = document.getElementById('game-container');
    juegoContainer.style.display = 'none';

    const casillasObjetos = document.getElementById('casillas-objetos-conseguidos');
    casillasObjetos.style.display = 'none';

    // Muestra la pantalla de inicio y otros elementos según sea necesario
    const pantallaInicial = document.getElementById('pantalla-inicial');
    pantallaInicial.style.display = 'block';
    pantallaInicial.style.display = 'flex'; // Cambia a flex para centrar vertical y horizontalmente
    pantallaInicial.style.alignItems = 'center'; // Centra verticalmente
    pantallaInicial.style.justifyContent = 'center'; // Centra horizontalmente

}
function mostrarSiguienteMensaje() {
    if (indiceMensajeActual < mensajes.length - 1) {
        // Muestra el siguiente mensaje
        indiceMensajeActual++;
        mostrarMensaje(mensajes[indiceMensajeActual]);
    } else {
        // Muestra el mensaje de inicio y oculta el botón de siguiente
        ocultarBotonSiguiente();
        mostrarBotonComenzar();
    }
}
    
    function mostrarMensaje(mensaje) {
        const bocadillo = document.getElementById('bocadillo');
        bocadillo.innerText = mensaje;// Cambia textContent por innerText
        bocadillo.classList.add('mensaje'); 
    }
    
    function ocultarBotonSiguiente() {
      // Oculta el botón de siguiente
      document.getElementById('siguienteBtn').style.display = 'none';
    }
    
    function mostrarBotonComenzar() {
      // Muestra el botón de comenzar
      const botonComenzar = document.getElementById('comenzarBtn');
      if (botonComenzar) {
        botonComenzar.style.display = 'block';
      }
}
// Función para comenzar el juego
function comenzarJuego() {
    const botonComenzar = document.getElementById('comenzarBtn');
    botonComenzar.addEventListener('click', () => {
    
    const inicio = document.getElementById('pantalla-inicial');
    inicio.style.display = 'none';

    const laia = document.getElementById('laia');
    laia.style.display = 'block';

    const juego = document.getElementById('game-container');
    juego.style.display = 'block';
      console.log('Comenzando el juego'); 

      const tiempo = document.getElementById('tiempo-container');
    tiempo.style.display = 'block';
    iniciarContadorTiempo();
    
      const casillas = document.getElementById('casillas-objetos-conseguidos');
      casillas.style.display = 'block';
    });
}
function iniciarContadorTiempo() {
    // Limpia el intervalo anterior (si existe) para evitar múltiples intervalos
    clearInterval(contadorInterval);
    tiempoTranscurrido = 0;
    // Actualiza el tiempo cada segundo
    contadorInterval = setInterval(() => {
        tiempoTranscurrido++;

        // Muestra el tiempo en el elemento correspondiente en tu interfaz
        const tiempoElement = document.getElementById('tiempo');
        if (tiempoElement) {
            tiempoElement.textContent = tiempoTranscurrido;
        }

        console.log(`Tiempo transcurrido: ${tiempoTranscurrido} segundos`);

    }, 1000);
}
function asignarEventListeners() {
    const puertaConContrasena = document.getElementById('puerta11');
const dialog = document.getElementById('dialog');
const passwordInput = document.getElementById('passwordInput');

puertaConContrasena.addEventListener('click', () => {
    // Mostrar el cuadro de diálogo
    dialog.style.display = 'block';
});
    document.addEventListener('keydown', manejarTeclaPresionada);
    document.addEventListener('keyup', function(event) {
        if (['w', 'a', 's', 'd'].includes(event.key)) {
            stopAnimation(); 
        }
    });

    document.getElementById('siguienteBtn').addEventListener('click', mostrarSiguienteMensaje);
    for (const puerta of puertas) {
        // Excluye la puerta con el ID 'puerta11'
        if (puerta.id !== 'puerta11') {
            puerta.addEventListener('click', handleDoorClick);
        }else if (puerta.id === 'puerta11'){
            puerta.addEventListener('click', () => {
    // Mostrar el cuadro de diálogo
    dialog.style.display = 'block';
});

        }
    }
    for (const flecha of flechas) {
        flecha.addEventListener('click', handleArrowClick);
    }


// Función para manejar el evento de tecla presionada
function manejarTeclaPresionada(event) {
    const speed = 5; // Velocidad de movimiento

    if (event.key === 'w') {
        if (canMove(character, 'w', speed)) {
            character.style.top = `${parseInt(character.style.top, 10) - speed}px`;
            startAnimation('up');
                }
    } else if (event.key === 's') {
        if (canMove(character, 's', speed)) {
            character.style.top = `${parseInt(character.style.top, 10) + speed}px`;
            startAnimation('down');
                }
    } else if (event.key === 'a') {
        if (canMove(character, 'a', speed)) {
            character.style.left = `${parseInt(character.style.left, 10) - speed}px`;
            startAnimation('left');
        }
    } else if (event.key === 'd') {
        if (canMove(character, 'd', speed)) {
            character.style.left = `${parseInt(character.style.left, 10) + speed}px`;
            startAnimation('right');
        }
    }
}
function canMove(character, direction, speed) {
    const characterRect = character.getBoundingClientRect();

    for (const pared of paredes) {
        const paredRect = pared.getBoundingClientRect();

        switch (direction) {
            case 'w':
                if (
                    characterRect.top - speed <= paredRect.bottom &&
                    characterRect.bottom > paredRect.top &&
                    characterRect.right > paredRect.left &&
                    characterRect.left < paredRect.right
                ) {
                    return false; // Colisión
                }
                break;
            case 's':
                if (
                    characterRect.bottom + speed >= paredRect.top &&
                    characterRect.top < paredRect.bottom &&
                    characterRect.right > paredRect.left &&
                    characterRect.left < paredRect.right
                ) {
                    return false; // Colisión
                }
                break;
            case 'a':
                if (
                    characterRect.left - speed <= paredRect.right &&
                    characterRect.right > paredRect.left &&
                    characterRect.top < paredRect.bottom &&
                    characterRect.bottom > paredRect.top
                ) {
                    return false; // Colisión
                }
                break;
            case 'd':
                if (
                    characterRect.right + speed >= paredRect.left &&
                    characterRect.left < paredRect.right &&
                    characterRect.top < paredRect.bottom &&
                    characterRect.bottom > paredRect.top
                ) {
                    return false; // Colisión
                }
                break;
        }
    }
    return true; // Movimiento permitido
}
puertas.forEach((puerta) => {
    puerta.addEventListener('mouseenter', () => {
        puerta.classList.add('objetoResaltado');
    });

    puerta.addEventListener('mouseleave', () => {
        puerta.classList.remove('objetoResaltado');
    });
});
objetosInspeccionables.forEach((objeto) => {
    objeto.addEventListener('mouseenter', () => {
        objeto.classList.add('objetoResaltado');
    });

    objeto.addEventListener('mouseleave', () => {
        objeto.classList.remove('objetoResaltado');
    });
    objeto.addEventListener('click', () => {
        const objetoId = objeto.id;
        if (mensajesObjetos[objetoId]) {
            mostrarBocadillo(mensajesObjetos[objetoId]);   
        } else {
            mostrarBocadillo('Mensaje predeterminado para este objeto.');
        }
    });
});
objetosConseguibles.forEach((objeto) => {
    objeto.addEventListener('mouseenter', () => {
        objeto.classList.add('objetoResaltado');
    });

    objeto.addEventListener('mouseleave', () => {
        objeto.classList.remove('objetoResaltado');
    });
    objeto.addEventListener('click', () => {
        const objetoId = objeto.id;
        if (mensajesObjetos[objetoId]) {
            mostrarBocadillo(mensajesObjetos[objetoId]);
        } else {
            mostrarBocadillo('Mensaje predeterminado para este objeto.');
        }
    });
});


objetosConseguibles.forEach((objeto) => {
    objeto.addEventListener('click', () => {
        // Obtiene un identificador único del objeto 
        const objetoId = objeto.getAttribute('id');

        // Determina el objeto específico que se ha conseguido según el identificador
        const objetoConseguido = encontrarObjetoPorId(objetoId);

        // Agrega el objeto a la matriz de objetos conseguidos
        objetosConseguidos.push(objetoConseguido);
        console.log('Objeto Conseguido:', objetoConseguido);
        console.log( objetosConseguidos);

        verificarVictoria();
        agregarObjetoConseguido(objetoId);

    });
});
function handleDoorClick(event) {
    const clickedDoor = event.target;
    const nextRoom = clickedDoor.getAttribute('data-next-room');

    if (puedePasar(nextRoom)) {
        // Cambia de habitación aquí
        console.log(`Cambiando de habitación: de ${currentRoom} a ${nextRoom}`);

        changeRoom(nextRoom);
    } else {
        mostrarBocadillo('No tienes la llave para acceder a esta habitación.');
    }
}
function puedePasar(nextRoom) {
    // Agrega lógica para verificar si el jugador puede pasar a la siguiente habitación
    if (nextRoom === '7' && !objetosConseguidos.some(objeto => objeto.id === 'llave')) {
        // Si intenta pasar a la habitación 7 sin la llave, devuelve falso
        return false;
    }

    // En otros casos, permite el paso
    return true;
}

// Función para manejar el clic en las flechas
function handleArrowClick(event) {
    const clickedArrow = event.target;
    const previousRoom = clickedArrow.getAttribute('data-previous-room');

    if (currentRoom !== 1) { // Verifica que no estés en la habitación 1
        console.log(`Cambiando de habitación: de ${currentRoom} a ${previousRoom}`);
        changePreviousRoom(previousRoom);
    }
}

}

function checkForDoor() {
    const characterRect = character.getBoundingClientRect();

    for (const puerta of puertas1) {
        const nextRoom = puerta.getAttribute('data-next-room');
        const puertaRect = puerta.getBoundingClientRect();

        if (
            characterRect.left < puertaRect.right &&
            characterRect.right > puertaRect.left &&
            characterRect.top < puertaRect.bottom &&
            characterRect.bottom > puertaRect.top
        ) {
            // Determinar la puerta de salida y ajustar la posición del personaje
            ajustarPosicionPersonaje(puerta.id);

            // Cambia de habitación aquí
            console.log(`Cambiando de habitación: de ${currentRoom} a ${nextRoom}`);
            changeRoom(nextRoom);
        }
    }
}

function changePreviousRoom(previousRoom) {
    // Oculta los elementos de la habitación actual
    const habitacionActual = document.getElementById(`habitacion${currentRoom}`);
    habitacionActual.style.display = 'none';

    // Muestra los elementos de la nueva habitación
    const nuevaHabitacion = document.getElementById(`habitacion${previousRoom}`);
    console.log(`mostrando habitacion ${previousRoom}`);
    nuevaHabitacion.style.display = 'block';

    // Actualiza el estado del juego
    currentRoom = previousRoom;
    actualizarEstadoWasd();

    // Ajusta la posición inicial del personaje en la nueva habitación

}
function ajustarPosicionPersonaje(puertaId) {
    switch(puertaId) {
        case 'puerta12':
        case 'puerta13':
        case 'puerta15':
            character.style.top = `${parseInt(character.style.top, 10) + 35}px`;
            break;
        case 'puerta14':
            character.style.left = `${parseInt(character.style.left, 10) + 35}px`;
            break;
        case 'puerta16':
            character.style.left = `${parseInt(character.style.left, 10) - 35}px`;
            break;
        default:
            // Posición predeterminada si no es una de las puertas específicas
            character.style.top = `400px`;
            character.style.left = `680px`;
            break;
    }
}
function manejarObjetos(){
    objetosConseguibles.forEach((objeto) => {
        objeto.addEventListener('click', () => {
            // Obtiene un identificador único del objeto 
            const objetoId = objeto.getAttribute('id');
    
            // Determina el objeto específico que se ha conseguido según el identificador
            const objetoConseguido = encontrarObjetoPorId(objetoId);
    
            // Agrega el objeto a la matriz de objetos conseguidos
            objetosConseguidos.push(objetoConseguido);
            console.log('Objeto Conseguido:', objetoConseguido);
            console.log( objetosConseguidos);
    
            verificarVictoria(objetoId);
            agregarObjetoConseguido(objetoId);
    
        });
    });
    function agregarObjetoConseguido(objetoId) {
        // Encuentra todas las casillas
        const casillas = document.querySelectorAll('.casilla-objeto');
    
        // Itera sobre las casillas para find the first empty box
        for (const casilla of casillas) {
            if (!casilla.hasChildNodes()) {
                // Check if the object image is already in a box
                const objectInBox = document.querySelector(`.casilla-objeto img[src*="${obtenerURLImagen(objetoId)}"]`);
                if (!objectInBox) {
                    const imagenObjeto = document.createElement('img');
                    imagenObjeto.src = obtenerURLImagen(objetoId);
    
                    imagenObjeto.addEventListener('click', () => clicEnObjeto(imagenObjeto));
    
                    casilla.appendChild(imagenObjeto);
    
                    casilla.style.img = `url(${obtenerURLImagen(objetoId)})`;
                    imagenObjeto.style.backgroundSize = 'cover';
                    imagenObjeto.style.backgroundPosition = 'center';
                    imagenObjeto.style.width = '124px';
                    imagenObjeto.style.height = '124px';
                    imagenObjeto.style.borderRadius = '40px';
                    imagenObjeto.style.marginLeft = '-7px';
                    imagenObjeto.style.marginTop = '-5px';
                    imagenObjeto.style.boxShadow = 'inset 0 0 30px rgba(0, 0, 0, 0.5)';
    
                    break; 
                }
            }
        }
    }
    function obtenerURLImagen(objetoId) {
        const urlImagenes = {
            llave: 'imagenes/llave.jfif',
            libroMolinos: 'imagenes/libroMolinos1.jfif',
            bombilla: 'imagenes/bombilla.png',
            aerogenerador: 'imagenes/aerogenerador2.png',
            veleta: 'imagenes/veleta.png',
            penDrive:'imagenes/penDrive.jpeg',
            libroAire: 'imagenes/libroMolinos.png'

        };
    
        return urlImagenes[objetoId] || 'ruta/imagen-predeterminada.png';
    }
    
    // Función para encontrar un objeto por su identificador único
    function encontrarObjetoPorId(id) {
        
        const objetosDisponibles = [
            { id: 'libroMolinos', nombre: 'libroMolinos', imagen: 'imagen1.jpg', descripcion: 'Este es el objeto 1' },
            { id: 'llave', nombre: 'llave', imagen: 'llave.jfif', descripcion: 'Este es el objeto 2' },
            { id: 'aerogenerador', nombre: 'aerogenerador', imagen: 'aerogenerador.png', descripcion: 'Este es el objeto 4' },
            { id: 'veleta', nombre: 'veleta', imagen: 'veleta.png', descripcion: '¡Es una veleta! Este instrumento se utiliza para conocer la dirección del viento'},
            { id: 'penDrive', nombre: 'penDrive', imagen: 'penDrive.jpeg', descripcion: 'penDrive'},
            { id: 'libroAire', nombre: 'libroAire', imagen: 'imagen2.jpg', descripcion: 'libroAire'},



        ];
    
        return objetosDisponibles.find(objeto => objeto.id === id);
    }
}
function verificarVictoria(objetoId) {
    const libroMolinosConseguida = objetosConseguidos.some(objeto => objeto.id === 'libroMolinos');
    const aeroConseguido = objetosConseguidos.some(objeto => objeto.id === 'aerogenerador');
    const veletaConseguida = objetosConseguidos.some(objeto => objeto.id === 'veleta');
    const penDriveConseguido = objetosConseguidos.some(objeto => objeto.id === 'penDrive');
    const libroAireConseguido = objetosConseguidos.some(objeto => objeto.id === 'libroAire');




    if (libroMolinosConseguida && aeroConseguido && veletaConseguida && penDriveConseguido && libroAireConseguido) {
        mostrarBocadillo(mensajesObjetos[objetoId]);
        setTimeout(() => {
        }, 7000);
        mostrarBocadillo('¡Has ganado! Ese era el último objeto que nos hacía falta. Has conseguido todo lo necesario para comenzar a construir la granja. ¡Felicidades!');
        switch(tiempoTranscurrido){
            case tiempoTranscurrido <= 30 && tiempoTranscurrido:
                puntos = 25;
                break;
            case tiempoTranscurrido <= 45 && tiempoTranscurrido > 30:
                puntos = 20;
                break;
            case tiempoTranscurrido <= 65 && tiempoTranscurrido > 45:
                puntos = 15;
                break;
            case tiempoTranscurrido <= 80 && tiempoTranscurrido > 65:
                puntos = 10;
                break;
            case tiempoTranscurrido <= 95 && tiempoTranscurrido > 80:
                puntos = 5;
                break;
            case tiempoTranscurrido > 95:
                puntos = 0;
                break;
                default: puntos = 1;
        }
        setTimeout(() => {
            setCookie('Puntos', puntos, 30); 
            window.location.href = '../../controllers_php/updatePuntosController.php';
        }, 5000); 
        
    }
    return indiceMensajeActual
}
function setCookie(nombre, valor, diasExpiracion) {
    const fechaExpiracion = new Date();
    fechaExpiracion.setTime(fechaExpiracion.getTime() + (diasExpiracion * 24 * 60 * 60 * 1000));
    const expiracion = "expires=" + fechaExpiracion.toUTCString();
    document.cookie = nombre + "=" + valor + ";" + expiracion + ";path=/";
}
const puertaConContrasena = document.getElementById('puerta11');
const dialog = document.getElementById('dialog');
const passwordInput = document.getElementById('passwordInput');

puertaConContrasena.addEventListener('click', () => {
    // Mostrar el cuadro de diálogo
    dialog.style.display = 'block';
});
function verificarContrasena() {
    const contrasenaIngresada = document.getElementById('passwordInput').value;
    if (contrasenaIngresada === '123') { // Suponiendo que '123' es la contraseña correcta
        console.log('Contraseña correcta. Cambiando de habitación...');
        changeRoom(11);
        ocultarDialog();
    } else {
        mostrarBocadillo('Contraseña incorrecta. Inténtalo de nuevo.');
        document.getElementById('passwordInput').value = ''; // Limpiar el campo de contraseña
    }
}

function changeRoom(nextRoom) {
    // Oculta los elementos de la habitación actual
    const habitacionActual = document.getElementById(`habitacion${currentRoom}`);
    habitacionActual.style.display = 'none';

    // Muestra los elementos de la nueva habitación
    const nuevaHabitacion = document.getElementById(`habitacion${nextRoom}`);
    console.log(`mostrando habitacion ${nextRoom}`);
    nuevaHabitacion.style.display = 'block';

    // Actualiza el estado del juego
    currentRoom = nextRoom;
    actualizarEstadoWasd();

}
function mostrarBocadillo(mensaje) {
    const bocadilloInGame = document.getElementById('bocadilloInGame');
    const texto = document.getElementById('texto');
    
    texto.innerText = mensaje;
    bocadilloInGame.style.display = 'block';
    
    // Agrega un evento para ocultar el bocadillo después de cierto tiempo (por ejemplo, 3 segundos)
    setTimeout(() => {
        bocadilloInGame.style.display = 'none';
    }, 7000); 
}
function ocultarDialog() {
    document.getElementById('dialog').style.display = 'none';
}
function actualizarEstadoWasd() {
    if (currentRoom === 1) {
        wasdDiv.style.display = 'block';
    } else {
        wasdDiv.style.display = 'none';
    }
}
const frames = {
    down: ['/L2/Europa/imagenes/abajo.png', '/L2/Europa/imagenes/abajo1.png','/L2/Europa/imagenes/abajo.png', '/L2/Europa/imagenes/abajo2.png'],
    up: ['/L2/Europa/imagenes/arriba.png', '/L2/Europa/imagenes/arriba1.png', '/L2/Europa/imagenes/arriba.png','/L2/Europa/imagenes/arriba2.png'],
    left: ['/L2/Europa/imagenes/izquierda.png', '/L2/Europa/imagenes/izquierda1.png','/L2/Europa/imagenes/izquierda.png', '/L2/Europa/imagenes/izquierda2.png'],
    right: ['/L2/Europa/imagenes/derecha.png', '/L2/Europa/imagenes/derecha1.png','/L2/Europa/imagenes/derecha.png', '/L2/Europa/imagenes/derecha2.png']
};
const staticDirectionImages = {
    'w': '/L2/Europa/imagenes/arriba.png',
    'a' : '/L2/Europa/imagenes/izquierda.png',
    's': '/L2/Europa/imagenes/abajo.png',
    'd': '/L2/Europa/imagenes/derecha.png'
};
let currentFrame = 0;
let animationIntervalId; // Guarda el ID del intervalo de animación actual
let currentDirection = null; // Guarda la dirección actual del personaje

function animateCharacter(direction) {
    const character = document.getElementById('characterImg');
    character.src = frames[direction][currentFrame];
    currentFrame = (currentFrame + 1) % frames[direction].length;
}

function startAnimation(direction) {
    if (currentDirection !== direction) {
        currentDirection = direction; // Actualiza la dirección actual
        clearInterval(animationIntervalId); // Limpia el intervalo anterior
        currentFrame = 0; // Reinicia el índice de cuadros
        animationIntervalId = setInterval(() => {
            animateCharacter(direction)
        }, 200); // Cambia la imagen cada 500ms
    }
}
function changeCharacterImage(key) {
    const character = document.getElementById('characterImg');
    character.src = staticDirectionImages[key];
}

function stopAnimation() {
    clearInterval(animationIntervalId); // Detén cualquier animación existente
    currentDirection = null; // Limpia la dirección actual
}
// Llama a checkForDoor en cada fotograma
function update() {
    checkForDoor();
    requestAnimationFrame(update);
}



// Iniciar el juego
iniciarJuego();
update();
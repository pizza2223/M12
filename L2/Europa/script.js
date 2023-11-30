// Definición de constantes y variables globales
const character = document.getElementById('character');
const paredes = document.querySelectorAll('.pared');
const puertas = document.querySelectorAll('.puerta');
const flechas = document.querySelectorAll('.flecha');
const puertas1 = document.querySelectorAll('.puerta1');
const objetosInspeccionables = document.querySelectorAll('.inspeccionable');
const objetosConseguibles = document.querySelectorAll('.conseguible');
const objetosConseguidos = [];
let currentRoom = 1;
let indiceMensajeActual = 0;

let tiempoTranscurrido = 0; // Tiempo en segundos transcurridos
let contadorInterval; // Variable para almacenar el intervalo del contador
let puntos;



const mensajes = [
    "¡Hola! Soy Laia",
    "Estoy emocionada de que estés aquí.",
    "Explora y descubre los secretos que aguardan.",
    // Añade más mensajes según sea necesario
];
const mensajesObjetos = {
    guia: '¡Has conseguido la guía!',
    libro1H5: 'Es un álbum de fotos.',
    llave: 'Has encontrado una llave.',
    aerogenerador: '¡Buscaste en el armario y encontraste el aerogenerador!',
    bombilla: "Has encontrado una bombilla y la has guardado."
    // Agrega más objetos y mensajes según sea necesario
};


// Establecer posiciones iniciales en JavaScript
character.style.position = 'absolute';
character.style.left = '500px';
character.style.top = '675px';

// Función principal para inicializar el juego
function iniciarJuego() {

    mostrarPantallaInicio(indiceMensajeActual);
    document.getElementById('siguienteBtn').addEventListener('click', mostrarSiguienteMensaje);    

    comenzarJuego();
    asignarEventListeners();
    checkForDoor();
    manejarObjetos();
    // Puedes agregar más inicializaciones aquí
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
        mostrarMensaje("¡Empecemos!");
        ocultarBotonSiguiente();
        mostrarBotonComenzar();
      }
    }
    
    function mostrarMensaje(mensaje) {
      // Lógica para mostrar el mensaje en el bocadillo
      // Puedes adaptar esto según tu implementación
      document.getElementById('bocadillo').textContent = mensaje;
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

        // Puedes realizar acciones adicionales aquí según tu lógica

        console.log(`Tiempo transcurrido: ${tiempoTranscurrido} segundos`);

        // Aquí puedes agregar lógica para detener el contador cuando sea necesario
    }, 1000); // El contador se actualiza cada segundo (1000 ms)
}
function asignarEventListeners() {
    document.addEventListener('keydown', manejarTeclaPresionada);
    const botonComenzar = document.getElementById('comenzarBtn');
    botonComenzar.addEventListener('click', comenzarJuego);
    document.getElementById('siguienteBtn').addEventListener('click', mostrarSiguienteMensaje);
    for (const puerta of puertas) {
        puerta.addEventListener('click', handleDoorClick);
    }
    for (const flecha of flechas) {
        flecha.addEventListener('click', handleArrowClick);
    }


// Función para manejar el evento de tecla presionada
function manejarTeclaPresionada(event) {
    const speed = 10; // Velocidad de movimiento
    if (event.key === 'w') {
        if (canMove(character, 'w', speed)) {
            character.style.top = `${parseInt(character.style.top, 10) - speed}px`;
            console.log('moviendose hacia arriba')
        }
    } else if (event.key === 's') {
        if (canMove(character, 's', speed)) {
            character.style.top = `${parseInt(character.style.top, 10) + speed}px`;
        }
    } else if (event.key === 'a') {
        if (canMove(character, 'a', speed)) {
            character.style.left = `${parseInt(character.style.left, 10) - speed}px`;
        }
    } else if (event.key === 'd') {
        if (canMove(character, 'd', speed)) {
            character.style.left = `${parseInt(character.style.left, 10) + speed}px`;
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
        puerta.classList.add('puertaResaltada');
    });

    puerta.addEventListener('mouseleave', () => {
        puerta.classList.remove('puertaResaltada');
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
            alert(mensajesObjetos[objetoId]);
        } else {
            alert('Mensaje predeterminado para este objeto.');
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
            alert(mensajesObjetos[objetoId]);
        } else {
            alert('Mensaje predeterminado para este objeto.');
        }
    });
});
function reiniciarJuego() {
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

        let tiempoFinal = tiempoTranscurrido;

    // Restablece el índice del mensaje actual
    indiceMensajeActual = 0;
    mostrarSiguienteMensaje();
    
}
function verificarVictoria() {
    const guiaConseguida = objetosConseguidos.some(objeto => objeto.id === 'guia');
    const aeroConseguido = objetosConseguidos.some(objeto => objeto.id === 'aerogenerador');

    if (guiaConseguida && aeroConseguido) {
        alert('¡Has ganado! Has conseguido la guía y el aerogenerador. ¡Felicidades!');
        // Puedes realizar acciones adicionales aquí, como reiniciar el juego o redirigir a otra página
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
        setCookie('puntos', puntos, 30); // 30 días de expiración, ajusta según sea necesario
        window.location.href = '../../controllers_php/updatePuntosController.php';
    }
}
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

        // Puedes realizar acciones adicionales aquí, como mostrar un mensaje o actualizar la interfaz gráfica
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
        alert('No tienes la llave para acceder a esta habitación.');
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

function checkForDoor(){
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
                // Cambia de habitación aquí
                console.log(`Cambiando de habitación: de ${currentRoom} a ${nextRoom}`);
                character.style.top = `${parseInt(character.style.top, 10) - 30}px`;
                changeRoom(nextRoom);
                
            }
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

    // Ajusta la posición inicial del personaje en la nueva habitación


    // Resto de la lógica para cambiar de habitación (puedes personalizar según tus necesidades)
    // Cargar recursos específicos de la habitación, ajustar la lógica de colisiones, etc.
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

    // Ajusta la posición inicial del personaje en la nueva habitación


    // Resto de la lógica para cambiar de habitación (puedes personalizar según tus necesidades)
    // Cargar recursos específicos de la habitación, ajustar la lógica de colisiones, etc.
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
    
            verificarVictoria();
            agregarObjetoConseguido(objetoId);
    
            // Puedes realizar acciones adicionales aquí, como mostrar un mensaje o actualizar la interfaz gráfica
        });
    });
    function agregarObjetoConseguido(objetoId) {
        // Encuentra todas las casillas
        const casillas = document.querySelectorAll('.casilla-objeto');
    
        // Itera sobre las casillas para encontrar la primera vacía
        for (const casilla of casillas) {
            if (!casilla.hasChildNodes()) {
                // Crea una imagen con la URL correspondiente al objeto
                const imagenObjeto = document.createElement('img');
                imagenObjeto.src = obtenerURLImagen(objetoId);
    
                // Agrega un evento de clic a la imagen recién creada
                imagenObjeto.addEventListener('click', () => clicEnObjeto(imagenObjeto));
    
                // Agrega la imagen a la casilla
                casilla.appendChild(imagenObjeto);
    
                // Establece el estilo de la casilla
                casilla.style.img = `url(${obtenerURLImagen(objetoId)})`;
                imagenObjeto.style.backgroundSize = 'cover';
                imagenObjeto.style.backgroundPosition = 'center';
                imagenObjeto.style.width = '124px';
                imagenObjeto.style.height = '124px';
                imagenObjeto.style.borderRadius = '40px';
                imagenObjeto.style.marginLeft = '-7px';
                imagenObjeto.style.marginTop = '-5px';
                imagenObjeto.style.boxShadow = 'inset 0 0 30px rgba(0, 0, 0, 0.5)';
    
                
    
                break; // Sale del bucle después de colocar la imagen en la casilla vacía
            }
        }
    }
    function obtenerURLImagen(objetoId) {
        const urlImagenes = {
            llave: 'imagenes/llave.jfif',
            guia: 'imagenes/guia.jfif',
            bombilla: 'imagenes/bombilla.png'
            // ... Agrega más objetos según sea necesario
        };
    
        return urlImagenes[objetoId] || 'ruta/imagen-predeterminada.png';
    }
    
    // Función para encontrar un objeto por su identificador único
    function encontrarObjetoPorId(id) {
        // Implementa la lógica para buscar el objeto en tu estructura de datos (por ejemplo, un array de objetos)
        // Devuelve el objeto correspondiente o null si no se encuentra
        // Aquí puedes usar un array, una base de datos o cualquier otra estructura de datos que almacene tus objetos
        // Por ejemplo:
        const objetosDisponibles = [
            { id: 'guia', nombre: 'guia', imagen: 'imagen1.jpg', descripcion: 'Este es el objeto 1' },
            { id: 'llave', nombre: 'llave', imagen: 'llave.jfif', descripcion: 'Este es el objeto 2' },
            { id: 'bombilla', nombre: 'bombilla', imagen: 'bombilla.jfif', descripcion: 'Este es el objeto 3' },
            { id: 'aerogenerador', nombre: 'aerogenerador', imagen: 'aerogenerador.jpg', descripcion: 'Este es el objeto 4' },
            // Agrega más objetos según sea necesario
        ];
    
        return objetosDisponibles.find(objeto => objeto.id === id);
    }
}
function verificarVictoria(indiceMensajeActual) {
    const guiaConseguida = objetosConseguidos.some(objeto => objeto.id === 'guia');
    const aeroConseguido = objetosConseguidos.some(objeto => objeto.id === 'aerogenerador');

    if (guiaConseguida && aeroConseguido) {
        alert('¡Has ganado! Has conseguido la guía y el aerogenerador. ¡Felicidades!');
        // Puedes realizar acciones adicionales aquí, como reiniciar el juego o redirigir a otra página
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
        setCookie('Puntos', puntos, 30); // 30 días de expiración, ajusta según sea necesario

        indiceMensajeActual = reiniciarJuego();

        
    }
    return indiceMensajeActual
}
function setCookie(nombre, valor, diasExpiracion) {
    const fechaExpiracion = new Date();
    fechaExpiracion.setTime(fechaExpiracion.getTime() + (diasExpiracion * 24 * 60 * 60 * 1000));
    const expiracion = "expires=" + fechaExpiracion.toUTCString();
    document.cookie = nombre + "=" + valor + ";" + expiracion + ";path=/";
}
// Llama a checkForDoor en cada fotograma
function update() {
    checkForDoor();
    requestAnimationFrame(update);
}

// Iniciar el juego
iniciarJuego();
update();
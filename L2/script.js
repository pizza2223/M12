const overlay = document.getElementById('overlay');
const btnCentro = document.getElementById('btnCentro');
const containerGame = document.getElementById('inicio');

// Función para habilitar el juego y ocultar el overlay
function habilitarJuego() {
    // Agregar clase para habilitar el juego
    containerGame.classList.remove('disabled');
    // Ocultar el overlay
    overlay.style.visibility = 'hidden';
}

// Agregar evento de clic al botón en el centro
btnCentro.addEventListener('click', habilitarJuego);



function showOverlay(element) {
    element.querySelector('.overlay').style.backgroundColor = 'rgba(0, 255, 0, 0.7)';
}

function hideOverlay(element) {
    element.querySelector('.overlay').style.backgroundColor = 'rgba(0, 255, 0, 0)';
}

function showPopup(title, imageSrc, description) {
    document.getElementById('popupTitle').textContent = title;
    document.getElementById('popupImage').src = imageSrc;
    document.getElementById('popupDescription').textContent = description;
    document.getElementById('popupDescription').style.fontSize='30px';
    document.getElementById('popupDescription').style.marginTop='30px';

    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Agregar eventos de hover
const minijuegosElements = document.querySelectorAll('.col-md-3');
minijuegosElements.forEach(element => {
    element.addEventListener('mouseover', () => showOverlay(element));
    element.addEventListener('mouseout', () => hideOverlay(element));
});
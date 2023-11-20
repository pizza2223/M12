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
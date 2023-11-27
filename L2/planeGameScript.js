let moveRate = 2;
let object1 = document.getElementById("p1");
let image = document.getElementById("planeimg");

if(getCookie("country")== null || getCookie("country")== 5){
    setCookie("country", 1, 1);
}

let countryToGoTo = getCookie("country");



let direction = {
    up: true,
    down: false,
    left: false,
    right: false
}
let position = {
    x: 10,
    y: 10
};

startTimer();



window.addEventListener("keydown", function (event) {

    if (event.code === "ArrowDown") {
        // Handle "down"
        direction.up = false;
        direction.down = true;
        updateYPosition(-moveRate);
        image.src = "./img/planeGame/planeDown.png";
    } else if (event.code === "ArrowUp") {
        // Handle "up"
        direction.up = true;
        direction.down = false;
        updateYPosition(moveRate);
        image.src = "./img/planeGame/planeUp.png";
    } else if (event.code === "ArrowLeft") {
        // Handle "left"

        direction.right = false;
        direction.left = true;
        updateXPosition(-moveRate);
        image.src = "./img/planeGame/planeLeft.png";
    } else if (event.code === "ArrowRight") {
        // Handle "right"
        direction.left = false;
        direction.right = true;
        updateXPosition(moveRate);
        image.src = "./img/planeGame/planeRight.png";
    }
    refreshPosition();
    checkDirection();
}, true);

function updateYPosition(distance) {
    position.y = position.y - distance;
}

// Update x-axis position.
function updateXPosition(distance) {
    position.x = position.x + distance;
}

function checkDirection() {
    if (direction.left == true && direction.up == true) {
        image.src = "./img/planeGame/planeUpLeft.png";
        direction.left = false;
        direction.up = false;
    } else if (direction.right == true && direction.up == true) {
        image.src = "./img/planeGame/planeUpRight.png";
        direction.right = false;
        direction.up = false;
    } else if (direction.right == true && direction.down == true) {
        image.src = "./img/planeGame/planeDownRight.png";
        direction.right = false;
        direction.down = false;
    } else if (direction.left == true && direction.down == true) {
        image.src = "./img/planeGame/planeDownLeft.png";
        direction.left = false;
        direction.down = false;

    }

}


function refreshPosition() {
    let x = position.x;
    let y = position.y;
    object1.style.left = x + "px";
    object1.style.top = y + "px";
}

function startTimer(){
    setInterval(function() {
        checkCollisionWithCountry();  
        setFlag(); 
    }, 500);
}

function checkCollisionWithCountry(){
let tolerance = 5;
    let countryCoordinates = [
    [371, 320], //brazil coordinates
    [333, 551], //kenya coordinates
    [296, 674], //india coordinates
    [231, 453] // europe coordinates
];

if((position.y <= countryCoordinates[countryToGoTo-1][0] + tolerance &&
    position.y >= countryCoordinates[countryToGoTo-1][0] - tolerance) &&
    (position.x <= countryCoordinates[countryToGoTo-1][1] + tolerance &&
    position.x <= countryCoordinates[countryToGoTo-1][1] - tolerance)){

sendToNewScreen();
countryToGoTo++
setCookie("country", countryToGoTo, 1);

}

}

function sendToNewScreen(){

    switch (countryToGoTo) {
        case "1":
            window.location.href = "Brasil/brazil.html"; 
          break;
        case "2":
            window.location.href = "Kenia/kenya.html"; 
          break;
        case "3":
            window.location.href = "India/india.html"; 
          break;
        case "4":
            window.location.href = "Europa/europe.html"; 
          break;
        default:
            setCookie("country", 1, 1);
}
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

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function setFlag(){
    let sources = ["br.png", "ke.png", "in.png", "bar.png"];
    let flag = document.getElementById("flag");
    flag.src = "img/planeGame/"+ sources[countryToGoTo-1];
}
var arrow_keys_handler = function(e) {
    switch(e.code){
        case "ArrowUp": case "ArrowDown": case "ArrowLeft": case "ArrowRight": 
            case "Space": e.preventDefault(); break;
        default: break; // do not block other keys
    }
};
window.addEventListener("keydown", arrow_keys_handler, false);

let buttonStart = document.getElementById('startGameButton')
buttonStart.addEventListener('click', startGame);
function startGame() {
    // Code to start your game
     // Get the element to be dragged
     buttonStart.remove();
 let bin = document.getElementById("bin");
 let imgBackground = document.getElementById("gameBoard");
 let imgDragable = document.getElementById("imgDragable");
 let clock = document.getElementById("clock");
 let progressBar= document.getElementById("load");    
let objecInBinAchieved = false;
let seconds = 0;
let hints = 5;
progress = 0;



placeAmountOfHints();
showItemUserIsSearching();
checkPositionInterval();

 objecInBinAchieved = false;
 
 let isDragging = false;
 let offset = { x: 0, y: 0 };
showItemUserIsSearching()
 // Attach event listeners for mouse down, move, and up events
 imgDragable.addEventListener("mousedown", function (e) {
     isDragging = true;

     // Calculate the offset of the mouse click from the top-left corner of the div
     offset.x = e.clientX - imgDragable.offsetLeft;
     offset.y = e.clientY - imgDragable.offsetTop;
 });

 document.addEventListener("mousemove", function (e) {
     if (isDragging) {
         // Calculate the new position of the div based on the mouse movement
         let x = e.clientX - offset.x;
         let y = e.clientY - offset.y;

         // Apply the new position to the div
         imgDragable.style.left = x + "px";
         imgDragable.style.top = y + "px";
     }
 });

 document.addEventListener("mouseup", function () {
     isDragging = false;
 });

function placeAmountOfHints(){
    for (let i = 0; i < hints; i++) {
        let x = document.createElement("IMG");
        x.setAttribute("data-bulb", i);
        x.setAttribute("class", "bulb");
        x.setAttribute("src", "img/img_bulb.png");
        x.setAttribute("width", "30");
        x.setAttribute("height", "30");
        x.setAttribute("alt", "light bulb");
        document.getElementById("bulbCard").appendChild(x);
      }

}

function changeLightBulb(){
let lightBulbs = document.querySelectorAll(".bulb");

  
for (const bulb of lightBulbs) {
    if(bulb.dataset.bulb == hints){
        bulb.src = "img/img_bulb_empty.png";
    }
}

}

 function arePositionsEqual() {
    const width = bin.offsetWidth;
    const height = bin.offsetHeight;
if ((imgDragable.offsetLeft >= bin.offsetLeft && imgDragable.offsetLeft <= bin.offsetLeft + width) &&
    (imgDragable.offsetTop >= bin.offsetTop && imgDragable.offsetTop <= bin.offsetTop + height)) 
{
    changeDragItemIMGSrc();
    showItemUserIsSearching();
    isDragging = false;
    changeItemPosition();
    seconds = 0;
    imgDragable.classList.remove('help'); 
    progress+= 10;
    progressBar.value = progress;
    checkUserWin();
  } else {  
   
}

}
function checkUserWin(){
    if(progress == 100){
        setCookie("puntos", 25, 1);
        let winDiv = document.createElement("div");
        winDiv.setAttribute("id", "win"); 
        winDiv.setAttribute("class", "card");
        let winMessage = document.createTextNode("Has guanyat!");
        let homeButton = document.createElement("a");
        homeButton.setAttribute("class", "homeButton");
        homeButton.setAttribute("href", "../../controllers_php/updatePuntosController.php");
        winDiv.appendChild(winMessage);
        winDiv.appendChild(homeButton);
        winDiv.appendChild
        //window.location = "../../controllers_php/updatePuntosController.php"

    }
}
function updateClock(){
    seconds++;  
    clock.textContent = seconds

 
}

function changeItemPosition(){

    let minWidth = 15;
    let minHeight = 15;
    let maxWidth = 1000;
    let maxHeight = 1000;

    let randLeft = Math.round(Math.random() * (maxWidth - minWidth) + minWidth);
    let randTop =  Math.round(Math.random() * (maxHeight - minHeight) + minHeight);
    imgDragable.style.left = randLeft + "px";
    imgDragable.style.top = randTop +"px";
    imgDragable.style.zIndex = 10;
}


function checkPositionInterval(){
    let positionsEqual;
    setInterval(function () {
    arePositionsEqual();
    updateClock(); 
    if(seconds > 10){
        imgDragable.classList.add('help'); 
        
        if(seconds < 12){
            hints--;
        changeLightBulb(hints); 
    }
    }
 },1000);

}

function showItemUserIsSearching()
{
const imgSrcToShow = document.getElementById("imgDragable").getAttribute("src");
const img = document.getElementById("imgSearchable");
img.src = imgSrcToShow;
}


function changeDragItemIMGSrc()
{
       let newImgSrc;
       let max = 9;
       let min = 0;
       let randNum =  Math.round(Math.random() * (max - min) + min);

       let paths = ["bottle.png", "box.png", "cup.png", "detergent.png", "detergent2.png", "glassjar.png", "mug.png", "newspaper.png", "paperBag.png", "pizzaBox.png"]

        newImgSrc = 'img/'+ paths[randNum];
        document.getElementById("imgDragable").src = newImgSrc;
        console.log("new path: "+ newImgSrc);

}

const handleMouseMove = (e) => {
    const {clientX, clientY } = e;
    console. log({ clientX, clientY});
    1/0 - 1
    const {innerwidth, innerHeight } = window;
    const fractionX = clientX / innerWidth; //0 - 1
    const fractionY = clientY / innerWidth; //0 - 1
    
    console. log({fractionX, fractionY});
    const pupilX = -10 + fractionX * 40;
    const pupilY = -20 + fractionY * 40;
    console. log({pupilX, pupilY});
    document.querySelectorAll('.pupil').forEach(el => {
    el.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    })

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

window.addEventListener ('mousemove', handleMouseMove);

}


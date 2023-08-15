
const butnStart = document.querySelector('[data-start]');
const butnStop = document.querySelector('[data-stop]');
let body = document.querySelector('body');

butnStart.addEventListener('click', onClickStart);
butnStop.addEventListener('click', onClickStop);

let changeColor = null;

function onClickStart(evt) {
 changeColor = setInterval(() => {
     body.style.backgroundColor = getRandomHexColor();
     butnStart.disabled = true;
     butnStop.disabled = false;
}, 1000)
   
    
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function onClickStop(evt) {
    clearInterval(changeColor);
    butnStop.disabled = true;
    butnStart.disabled = false;
}
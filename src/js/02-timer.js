
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  dataDays:document.querySelector('[data-days]'),
  dataHours:document.querySelector('[data-hours]'),
  dataMinutes:document.querySelector('[data-minutes]'),
  dataSeconds:document.querySelector('[data-seconds]'),

} 

const dateNow = Date.now();
let dateEnd;
let timerId = null;
let deltaTime = null;

elements.button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
   console.log(selectedDates[0]);
    dateEnd = selectedDates[0].getTime();
    if ( dateEnd <= dateNow) {
      elements.button.disabled = true;
      return Notify.info('Please choose a date in the future');
    } else {
      elements.button.disabled = false;
    }
     
  }
  
};

const calendar = flatpickr(elements.input, options);
 
elements.button.addEventListener('click', onClick);

function onClick() {
 timerId = setInterval(() => {
  const currentTime = Date.now();
   deltaTime = dateEnd - currentTime;
   console.log(deltaTime);
   if (deltaTime <= 0) {
  clearInterval(timerId);
     return;
  }
   const { days, hours, minutes, seconds } = convertMs(deltaTime);
   console. log (`${ days } ${ hours } ${ minutes } ${ seconds } `);
    elements.button.disabled = true;
   updateTimer({ days, hours, minutes, seconds });
 }, 1000);
  
   
}

function updateTimer({ days, hours, minutes, seconds }) {
  
  elements.dataDays.textContent = `${days}`;
  elements.dataHours.textContent = `${hours}`;
  elements.dataMinutes.textContent = `${minutes}`;
  elements.dataSeconds.textContent = `${seconds}`;
}


 function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days =addLeadingZero(Math.floor(ms / day)) ;
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour)) ;
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return value.toString().padStart(2,'0');
}
  



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
let dateFuture;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    let datePast = selectedDates[0].getTime();
    if ( datePast <= dateNow) {
      elements.button.disabled = true;
      return Notify.info('Please choose a date in the future');
    } else {
      elements.button.disabled = false;
    }
     
  },
};

 const calendar = flatpickr(elements.input, options);

 elements.button.disabled = true;

elements.button.addEventListener('click', onClick);

function onClick() {
  setInterval(() => {
    convertMs();
   }, 1000)
}




function addLeadingZero(value) {
  return value.toString().padStart(2,'0');
}

//elements.dataDays.textContent = 


//функція для підрахунку значень
 function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
elements.timer.textContent = `${days} ${hours} ${minutes} ${seconds}`
console.log(elements.timer.textContent);

   return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


  


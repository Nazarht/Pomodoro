const workLabel = document.getElementById('work');
const breakLabel = document.getElementById('break');

const minutesDom = document.getElementsByClassName('minutes')[0];
const secoundsDom = document.getElementsByClassName('secounds')[0];

const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const restart = document.querySelector('.restart');

let workTime = 25;
let breakTime = 5;
let secounds = '00'

// display time 
window.onload = () => {
    minutesDom.innerHTML = workTime;
    secoundsDom.innerHTML = secounds;

    workLabel.classList.add('active');
}

//pause params
let secoundsPause;
let workPause;
let breakPause;
let pauseBool = false;

// work params
let workMinutes;
let breakMinutes;
let breakCounter = 0;

// interval
let myInterval;


function forceBreak() {
    clearInterval(myInterval)
    minutesDom.innerHTML = breakTime;
    secoundsDom.innerHTML = '00';
    breakLabel.classList.add('active');
    workLabel.classList.remove('active');
    pauseBool = true;
    play.style.display = 'inline';
    pause.style.display = 'none';
    breakCounter = 1;
    workPause = breakTime - 1;
    secoundsPause = 59;
}

breakLabel.onclick = forceBreak

function restartFn() {
    clearInterval(myInterval);
    minutesDom.innerHTML = workTime;
    secoundsDom.innerHTML = '00';
    workLabel.classList.add('active');
    breakLabel.classList.remove('active');
    pauseBool = false;
    play.style.display = 'inline';
    pause.style.display = 'none';
    breakCounter = 0;
}

workLabel.onclick = restartFn;


function start() {
    // change buttons
    play.style.display = 'none';
    pause.style.display = 'inline';

    if (pauseBool === false) {
    secounds = 59;
    workMinutes = workTime - 1;
    breakMinutes = breakTime - 1;
    } else {
         workMinutes = workPause;
         secounds = secoundsPause;
    }

    function stop() {
        play.style.display = 'inline';
        pause.style.display = 'none';
        pauseBool = true

        workPause = minutesDom.innerHTML;
        secoundsPause = secoundsDom.innerHTML;
        clearInterval(myInterval);
    }

    pause.onclick = stop;

    function startTimer() {
        // set visual
        minutesDom.innerHTML = workMinutes;
        secoundsDom.innerHTML = secounds;
        secounds -= 1;
        
        if (secounds === 0) { 

            workMinutes -= 1;
            secounds = 59
        }


        if (workMinutes === -1) {


            if (breakCounter % 2 === 0) {
                //change status
            workLabel.classList.remove('active');
            breakLabel.classList.add('active');


            pauseBool = false;
            workMinutes = breakMinutes;
            breakCounter += 1;
            } else {
                //change status
                breakLabel.classList.remove('active');
                workLabel.classList.add('active');

                pauseBool = false;
                workMinutes = workTime - 1;
                breakCounter += 1;
                
            }
        }
    }

    // stop function

    restart.onclick = restartFn;

    myInterval = setInterval(startTimer, 1000);
} 

play.onclick = start;

const workLabel = document.getElementById('work');
const breakLabel = document.getElementById('break');

const minutesDom = document.getElementsByClassName('minutes')[0];
const secoundsDom = document.getElementsByClassName('secounds')[0];

const play = document.querySelector('.play');
const restart = document.querySelector('.restart');

let workTime = 2;
let breakTime = 1;

let secounds = '00'

// display time 
window.onload = () => {
    minutesDom.innerHTML = workTime;
    secoundsDom.innerHTML = secounds;

    workLabel.classList.add('active');
}

function start() {

    // change buttons
    play.style.display = 'none';
    restart.style.display = 'inline';

    function stop() {
        location.reload();
    }

    restart.onclick = stop;
    

    secounds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    let breakCounter = 0;

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

            workMinutes = breakMinutes;
            breakCounter += 1;
            } else {
                //change status
                breakLabel.classList.remove('active');
                workLabel.classList.add('active');

                workMinutes = workTime;
                breakCounter += 1;
            }
        }
    }

    setInterval(startTimer, 1000);
}

function stop() {
    play.removeEventListener(start);
}

play.onclick = start;

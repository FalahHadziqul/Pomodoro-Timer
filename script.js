let timeLeft = 50 * 60;
let isRunning = false;
let timerInterval;

const timerDisplay = document.getElementById("timer");
const startStopBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");

function startTimer(){
    isRunning = true;
    startStopBtn.textContent = "Stop";

    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if(timeLeft <= 0){
            resetTimer();
        }

    }, 1000);
}   

function stopTimer(){
    isRunning = false;
    startStopBtn.textContent = "Start";
    clearInterval(timerInterval);
}

function resetTimer(){
    isRunning = false;
    clearInterval(timerInterval);
    timeLeft = 50 * 60;
    startStopBtn.textContent = "Start";
    updateDisplay();
}

function updateDisplay(){
    timerDisplay.textContent = formatTime(timeLeft);
    
}

function formatTime(time){
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    
    const formattedMinutes = minutes.toString().padStart(2,'0');
    const formattedSeconds = seconds.toString().padStart(2,'0');

    return `${formattedMinutes}:${formattedSeconds}`;
}   

startStopBtn.addEventListener('click', ()=>{
    if(isRunning){
        stopTimer();
    }
    else{
        startTimer();
    }
});

resetBtn.addEventListener('click', ()=>{
    resetTimer();
});

updateDisplay();
let timeRest = 5;
let timeStudy = 10;
let timeLeft = timeStudy;
let isRunningStudy = false;
let isRunningRest = false;
let studyInterval = true;
let restInterval = false;
let timerInterval;

const timerDisplay = document.getElementById("timer");
const startStopBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const animationText = document.getElementById("animation");
const phaseText = document.getElementById("phase");

function startTimer(){
    if(studyInterval){
        isRunningStudy = true;
        startStopBtn.textContent = "Stop";
        phaseText.textContent = "Studying..";
        animationText.textContent += "..";
        
        updateDisplay();
        timerInterval = setInterval(() => {
            timeLeft--;
            if(timeLeft < 0){
                isRunningStudy = false;
                studyInterval = false;
                restInterval = true;
                timeLeft = timeRest;
                clearInterval(timerInterval);
                startTimer();
            }
            else{
                updateDisplay();
                if(animationText.textContent.includes(".....")){
                    animationText.textContent = animationText.textContent.replace(".....", "..");
                }
                else{
                    animationText.textContent += ".";
                }
            }
        }, 1000);
    }
    else if(restInterval){
        isRunningRest = true;
        startStopBtn.textContent = "Stop";
        phaseText.textContent = "Resting..";
        animationText.textContent = "";

        updateDisplay();
        timerInterval = setInterval(() => {
            timeLeft--;
            if(timeLeft < 0){
                restInterval = false;
                isRunningRest = false;
                studyInterval = true;
                timeLeft = timeStudy; 
                clearInterval(timerInterval);
                startTimer();
            }
            else{
                updateDisplay();
            }
            
        }, 1000);
    }
}   


function stopTimer(){
    if(isRunningStudy){
        isRunningStudy = false;
    }
    else if (isRunningRest){
        isRunningRest = false;
    }
    startStopBtn.textContent = "Resume";
    animationText.textContent = "";
    phaseText.textContent = "";
    clearInterval(timerInterval);
}

function resetTimer(){
    if(studyInterval){
        isRunningStudy = false;
        timeLeft = timeStudy;
    }
    else if(restInterval){
        isRunningRest = false;
        timeLeft = timeRest;
    }
    clearInterval(timerInterval);
    startStopBtn.textContent = "Start";
    animationText.textContent = "";
    phaseText.textContent = "";
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
    if(isRunningStudy){
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
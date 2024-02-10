var exerciseStatus = "none";
var count = 0;

// 0~1, more strict when 0
var squatSensitivity = 0.9;
var standSensitivity = 0.9;
var sitLeftSensitivity = 0.9;
var sitRightSensitivity = 0.9;


let exerciseCountdownStart = false;
let exerciseCountdownDone = false;
var countdownTimerForGo;
var countdownInterval;

function go() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    exerciseCountdownStart = true;
    exerciseCountdownDone = false;
    countdownTimerForGo = 3; 
    document.getElementById('goButton').style.display = 'none';
    document.getElementById('countdownDisplayForGo').style.display = 'block';
    document.getElementById('countdownDisplayForGo').innerHTML = countdownTimerForGo;

    countdownInterval = setInterval(function () {
        countdownTimerForGo--;
        document.getElementById('countdownDisplayForGo').innerHTML = countdownTimerForGo;
        
        if (countdownTimerForGo <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdownDisplayForGo').style.display = 'none';
            document.getElementById('stopButton').style.display = 'inline-block';
            exerciseCountdownDone = true;
        }
    }, 1000);
}


function stop() {
    exerciseCountdownStart = false;
    document.getElementById('stopButton').style.display = 'none';
    document.getElementById('exerciseCount').style.display = 'none';
    count = 0;
}

function updateExerciseCount(count) {
    var exerciseCountElement = document.getElementById('exerciseCount');
    exerciseCountElement.innerHTML = `${count} Reps`; // innerText 대신 innerHTML 사용
    exerciseCountElement.style.display = 'block'; // 요소를 화면에 보이게 함
}
function evaluatePose(prediction) {
    if (prediction[0].probability.toFixed(2) >= squatSensitivity
        && exerciseStatus !== "sitLeft" && exerciseStatus !== "sitRight") {
        exerciseStatus = "squat";
    } else if (prediction[1].probability.toFixed(2) >= standSensitivity) {
        if (exerciseStatus === "squat") {
            count++;
            var audio = new Audio('voice/count_' + count + '.mp3');
        } else if (exerciseStatus === "sitLeft") {
            count++;
            var audio = new Audio('voice/squatted_left.mp3');
        } else if (exerciseStatus === "sitRight") {
            count++;
            var audio = new Audio('voice/squatted_right.mp3');
        }
        updateExerciseCount(count)
        audio.play();
        exerciseStatus = "stand";
    } else if (prediction[2].probability.toFixed(2) >= sitLeftSensitivity && exerciseStatus === "squat") {
        exerciseStatus = "sitLeft";
    } else if (prediction[3].probability.toFixed(2) >= sitRightSensitivity && exerciseStatus === "squat") {
        exerciseStatus = "sitRight";
    }
}
document.getElementById('goButton').addEventListener('click', go);
document.getElementById('stopButton').addEventListener('click', stop);


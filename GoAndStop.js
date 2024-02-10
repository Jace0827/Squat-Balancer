var exerciseStatus = "none";
var count = 0;

// 0~1, more strict when 0
var squatSensitivity = 0.9;
var standSensitivity = 0.9;
var sitLeftSensitivity = 0.9;
var sitRightSensitivity = 0.9;

function go() {
    exerciseStarted = true;
    document.getElementById('goButton').style.display = 'none';
    document.getElementById('stopButton').style.display = 'inline-block';

}

function stop() {
    exerciseStarted = false;
    document.getElementById('stopButton').style.display = 'none';
    document.getElementById('goButton').style.display = 'inline-block';
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
            var audio = new Audio('voice/squat_left.mp3');
        } else if (exerciseStatus === "sitRight") {
            count++;
            var audio = new Audio('voice/squat_right.mp3');
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




function initializePoseByIndex(poseIndex, prediction, timestamp) {
    document.getElementById(poseNames[poseIndex]).style.display = 'block';
    if (prediction[poseIndex].probability.toFixed(2) >= 0.9 && countdownDone) {
        if (above90StartTimes[poseIndex] === 0) {
            above90StartTimes[poseIndex] = timestamp;

            let countdownValue = 3; 
            document.getElementById('countdownDisplay').style.display = 'block';
            document.getElementById('countdownDisplay').textContent = countdownValue;

            const countdownInterval = setInterval(() => {
                countdownValue--;
                document.getElementById('countdownDisplay').textContent = countdownValue;

                if (countdownValue <= 0) {
                    clearInterval(countdownInterval);
                    document.getElementById('countdownDisplay').style.display = 'none';
                }
            }, 1000);
        } else if (timestamp - above90StartTimes[poseIndex] >= 3000) {
            posesInit[poseIndex] = true;
            document.getElementById(poseNames[poseIndex]).style.fontWeight = 'bold';
            document.getElementById(poseNames[poseIndex]).style.color = "#2AB700";
            updatePoseIndex();
            const initialized = setInterval(() => {                        
                document.getElementById(poseNames[poseIndex]).style.display = 'none';
            }, 1000);
        }
    } else {
        above90StartTimes[poseIndex] = 0;
        document.getElementById('countdownDisplay').style.display = 'none';
    }
}

function updatePoseIndex() {
    poseIndex++;
    if (poseIndex >= maxPredictions) {
        
        console.log("All poses have been processed.");
    } else {
        
        console.log("Moving to the next pose:", poseNames[poseIndex]);
    }
} 
//todo: modify image
function howToUseStep1() {

    document.getElementById('howToUseStep1Container').style.display = 'block'; // Show instructions for Step 1
    // Optionally hide other elements that are not relevant during this step
    document.getElementById('countdownInputSection').style.display = 'none';
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('howToUseButton').style.display = 'none';
}

function howToUseStep2() {
    // Hide Step 1 instructions and show Step 2 instructions
    document.getElementById('howToUseStep1Container').style.display = 'none';
    document.getElementById('howToUseStep2Container').style.display = 'block';
}


function howToUseStep3() {
    // Hide Step 2 instructions and show Step 3 instructions
    document.getElementById('howToUseStep2Container').style.display = 'none';
    document.getElementById('howToUseStep3Container').style.display = 'block';
}

function howToUseStep4() {
    document.getElementById('howToUseStep3Container').style.display = 'none';
    document.getElementById('howToUseStep4Container').style.display = 'block';
}

function howToUseStep5() {
    document.getElementById('howToUseStep4Container').style.display = 'none';
    document.getElementById('howToUseStep5Container').style.display = 'block';
}

function howToUseStep6() {
    document.getElementById('howToUseStep5Container').style.display = 'none';
    document.getElementById('howToUseStep6Container').style.display = 'block';
}
function howToUseStep7() {
    document.getElementById('howToUseStep6Container').style.display = 'none';
    document.getElementById('howToUseStep7Container').style.display = 'block';
}
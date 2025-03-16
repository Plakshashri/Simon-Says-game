// Selecting necessary DOM elements
const body = document.querySelector("body");
const level = document.querySelector("h3");
const playground = document.querySelector(".playground");
const boxes = document.querySelectorAll(".box");
const helpBtn = document.querySelector(".help");

// Game state variables
let started = false;
let memArr = []; // Stores the sequence to be followed
let userArr = []; // Stores user input sequence
let levelNum = 0;
let clicks = 0;
let score = 0;

// Event listener for box clicks
playground.addEventListener("click", (event) => {
    if (started && event.target.classList.contains("box")) {
        userFlash(event.target); // Highlight user-selected box
        clicks++;
        userArr.push(event.target.id);
        checker(); // Validate user input
    }
});

// Function to add a flash effect when a user clicks a box
function userFlash(box) {
    box.classList.toggle("userFlash");
    setTimeout(() => box.classList.toggle("userFlash"), 200);
}

// Function to reset the game when the user makes a mistake
function resetGame() {
    level.innerText = `You have lost the game, Your score is ${score}`;
    started = false;
    userArr = [];
    memArr = [];
    clicks = 0;
    levelNum = 1;
    score = 0;

    body.classList.add("gameOver"); // Show game over effect
    setTimeout(() => body.classList.remove("gameOver"), 500);
}

// Function to check if user input matches the memory sequence
function checker() {
    if (userArr[clicks - 1] !== memArr[clicks - 1]) {
        resetGame(); // Restart the game on wrong input
    } else if (clicks === memArr.length) {
        score += 10; // Increase score if sequence is correct
        userArr = [];
        clicks = 0;
        setTimeout(selectBox, 500); // Move to next sequence
    }
}

// Event listener to start the game when a key is pressed
body.addEventListener("keydown", () => {
    if (!started) {
        started = true;
        selectBox();
    }
});

// Function to select a random box for the sequence
function selectBox() {
    level.innerText = `Level ${levelNum}`;
    levelNum++;
    let randVal = Math.floor(Math.random() * 4); // Selects a random box
    flashRand(randVal);
    memArr.push(boxes[randVal].id); // Stores the selected box ID
}

// Function to flash a selected box for memory sequence
function flashRand(randVal) {
    boxes[randVal].classList.add("memFlash");
    setTimeout(() => boxes[randVal].classList.remove("memFlash"), 250);
}

// Event listener for help button to show the current sequence
helpBtn.addEventListener("click", () => {
    let initText = level.innerText;
    level.innerText = `Memory array is: ${memArr}`;
    setTimeout(() => level.innerText = initText, 2000); // Restore original text after 2 sec
});


let score = 0;
let timeLeft = 10;
let highScore = localStorage.getItem("highScore") || 0;
let timer;
const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

const scoreDisplay = document.getElementById("score");
const timeLeftDisplay = document.getElementById("timeLeft");
const highScoreDisplay = document.getElementById("highScore");
const tapButton = document.getElementById("tapButton");
const restartButton = document.getElementById("restartButton");
const shareButton = document.getElementById("shareButton");
const nameForm = document.getElementById("nameForm");
const playerNameInput = document.getElementById("playerName");
const leaderboardList = document.getElementById("leaderboardList");
const timeProgress = document.getElementById("timeProgress");
const themeToggle = document.getElementById("themeToggle");

highScoreDisplay.textContent = highScore;

function updateProgressBar() {
    const totalTime = 10;
    const progress = (timeLeft / totalTime) * 314; // Circle circumference
    timeProgress.style.strokeDashoffset = progress;
}

function startGame() {
    score = 0;
    timeLeft = 10;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        updateProgressBar();

        if (timeLeft === 0) {
            clearInterval(timer);
            tapButton.disabled = true;
            restartButton.style.display = "block";

            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", highScore);
                highScoreDisplay.textContent = highScore;
            }
        }
    }, 1000);

    tapButton.disabled = false;
    restartButton.style.display = "none";
}

function tap() {
    if (timeLeft > 0) {
        score++;
        scoreDisplay.textContent = score;
    }
}

function restartGame() {
    startGame();
}

function addToLeaderboard(e) {
    e.preventDefault();
    const name = playerNameInput.value;
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    displayLeaderboard();
    nameForm.reset();
}

function displayLeaderboard() {
    leaderboardList.innerHTML = leaderboard
        .map((entry) => `<li>${entry.name}: ${entry.score}</li>`)
        .join("");
}

displayLeaderboard();

tapButton.addEventListener("click", tap);
restartButton.addEventListener("click", restartGame);
shareButton.addEventListener("click", shareScore);
themeToggle.addEventListener("click", toggleTheme);
nameForm.addEventListener("submit", addToLeaderboard);

// Start the game when the page loads
startGame();

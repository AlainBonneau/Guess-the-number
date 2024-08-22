"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeCalcul = timeCalcul;
var GuessedNumber = document.getElementById("guess-number");
var form = document.getElementById("form");
var goodNumber = document.getElementById("good-number");
var timeLeft = document.getElementById("time-left");
var replayBtn = document.getElementById("replay-btn");
var tryCount = document.getElementById("try-count");
var gameOver = document.getElementById("game-over");
var randomNumber = Math.round(Math.random() * 1000);
var counter = 1;
var tryCounter = 10;
var isGameOver = false;
var isCountOn = false;
console.log(randomNumber);
// Fonction qui permet de rafraîchir la page.
function refreshPage() {
    location.reload();
}
// Fonction qui affiche le bouton "Rejouer".
function replayButton() {
    replayBtn.classList.remove("replay-btn--hidden");
}
// fonction qui diminue le nombre d'essai du joueur à chaque fois qu'il se trompe
function gameCounter() {
    tryCounter--;
    var attemptWord = tryCounter === 1 ? 'essai' : 'essais';
    tryCount.innerHTML = "Il vous reste <span class=\"span-good\">".concat(tryCounter, "</span> ").concat(attemptWord);
    if (tryCounter === 0) {
        isGameOver = true;
        tryCount.innerHTML = "Vous avez <span class=\"span-good\">\u00E9puis\u00E9</span> tous vos essais.";
        timeLeft.innerHTML = "Temps \u00E9coul\u00E9 ! Le bon nombre \u00E9tait : <span class=\"span-good\">".concat(randomNumber, "</span>. Vous n'avez pas trouv\u00E9 le nombre en <span class=\"span-good\">").concat(counter - 1, "</span> essais.");
        blockInput();
        gameOverBtn();
        replayButton();
    }
}
// Fonction qui affiche un bouton gameover si l'utilisateur perd.
function gameOverBtn() {
    if (isGameOver) {
        gameOver.classList.add("game-over");
        gameOver.innerHTML = "GAMEOVER";
    }
}
// Fonction qui calcule le temps qu'il reste dans la partie et l'affiche sur la page.
function timeCalcul() {
    var countDown = new Date().getTime() + 60000;
    var x = setInterval(function () {
        var timeNow = new Date().getTime();
        var distance = countDown - timeNow;
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (isGameOver) {
            clearInterval(x);
        }
        if (!isGameOver) {
            timeLeft.innerHTML = "Il vous reste <span class=\"span-good\">".concat(seconds, "</span> secondes !");
        }
        if (seconds <= 0) {
            clearInterval(x);
            timeLeft.innerHTML = "Temps \u00E9coul\u00E9 ! Le bon nombre \u00E9tait : <span class=\"span-good\">".concat(randomNumber, "</span>. Vous n'avez pas trouv\u00E9 le nombre en <span class=\"span-good\">").concat(counter - 1, "</span> essais.");
            isGameOver = true;
            blockInput();
            gameOverBtn();
            replayButton();
        }
    }, 1000);
}
// Fonction qui clear l'input
function blockInput() {
    GuessedNumber.setAttribute("readonly", "");
}
//Fonction principale de l'application, c'est elle qui se lance une fois que l'utilisateur clique sur le bouton "Jouer". Elle indique à celui-ci si le nombre qu'il donne est trop petit, trop grand ou s'il s'agit du bon numéro.
function userGuess(e) {
    e.preventDefault();
    var parseGuessedNumber = parseInt(GuessedNumber.value, 10);
    if (isNaN(parseGuessedNumber)) {
        goodNumber.innerHTML = "Veuillez entrer un nombre valide !";
        return;
    }
    if (isGameOver)
        return;
    if (!isCountOn) {
        timeCalcul();
        isCountOn = true;
    }
    if (parseGuessedNumber === randomNumber) {
        goodNumber.innerHTML = "Vous avez trouv\u00E9 le bon nombre : <span class=\"span-good\">".concat(randomNumber, "</span> en <span class=\"span-good\">").concat(counter - 1, "</span> essais. F\u00E9licitation !");
        isGameOver = true;
        blockInput();
        replayButton();
    }
    else if (parseGuessedNumber < randomNumber) {
        GuessedNumber.value = "";
        counter++;
        gameCounter();
        goodNumber.innerHTML = "C'est plus que <span class=\"span-good\">".concat(parseGuessedNumber, "</span>");
    }
    else if (parseGuessedNumber > randomNumber) {
        GuessedNumber.value = "";
        counter++;
        gameCounter();
        goodNumber.innerHTML = "C'est moins que <span class=\"span-good\">".concat(parseGuessedNumber, "</span>");
    }
    else {
        goodNumber.innerHTML = "C'est vide...";
    }
}
form.addEventListener("submit", userGuess);
replayBtn.addEventListener("click", refreshPage);

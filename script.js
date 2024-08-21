const GuessedNumber = document.getElementById("guess-number");
const form = document.getElementById("form");
const goodNumber = document.getElementById("good-number");
const timeLeft = document.getElementById("time-left");
const replayBtn = document.getElementById("replay-btn");
const tryCount = document.getElementById("try-count");
const gameOver = document.getElementById("game-over");

let randomNumber = Math.round(Math.random() * 1000);
let counter = 1;
let tryCounter = 10;
let isGameOver = false;
let isCountOn = false;

// Fonction qui permet de rafraîchir la page.
function refreshPage() {
  location.reload();
}

// Fonction qui affiche le bouton "Rejouer" une fois la partie terminée.
function replayButton() {
  replayBtn.classList.remove("replay-btn--hidden");
}

// fonction qui diminue le nombre d'essai du joueur à chaque fois qu'il se trompe
function gameCounter() {
  tryCounter--;
  tryCount.innerHTML = `Il vous reste <span class="span-good">${tryCounter}</span> essais`;

  if (tryCounter === 1 || tryCounter === 0) {
    tryCount.innerHTML = `Il vous reste <span class="span-good">${tryCounter}</span> essai`;
  }

  if (tryCounter === 0) {
    isGameOver = true;
    tryCount.innerHTML = `Vous avez <span class="span-good">épuisé</span> tous vos essais.`;
    gameOverBtn();
  }
}

function gameOverBtn() {
  if (isGameOver) {
    gameOver.classList.add("game-over");
    gameOver.innerHTML = "GAMEOVER";
  }
}

// Fonction qui calcule le temps qu'il reste dans la partie et l'affiche sur la page.
function timeCalcul() {
  const countDown = new Date().getTime() + 60000;
  const x = setInterval(function () {
    const timeNow = new Date().getTime();
    const distance = countDown - timeNow;
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (!isGameOver) {
      timeLeft.innerHTML = `Il vous reste <span class="span-good">${seconds}</span> secondes !`;
    }

    if (seconds <= 0) {
      clearInterval(x);
      timeLeft.innerHTML = `Temps écoulé ! Le bon nombre était : <span class="span-good">${randomNumber}</span>. Vous n'avez pas trouvé le nombre en <span class="span-good">${
        counter - 1
      }</span> essais.`;
      isGameOver = true;
      gameOverBtn();
      replayButton();
    }
  }, 1000);
}

//Fonction principale de l'application, c'est elle qui se lance une fois que l'utilisateur clique sur le bouton "Jouer". Elle indique à celui-ci si le nombre qu'il donne est trop petit, trop grand ou s'il s'agit du bon numéro.
function userGuess(e) {
  e.preventDefault();
  const parseGuessedNumber = parseInt(GuessedNumber.value);

  if (isNaN(parseGuessedNumber)) {
    goodNumber.innerHTML = "Veuillez entrer un nombre valide !";
    return;
  }

  if (isGameOver) return;

  if (!isCountOn) {
    timeCalcul();
    isCountOn = true;
  }

  if (parseGuessedNumber === randomNumber) {
    goodNumber.innerHTML = `Vous avez trouvé le bon nombre : <span class="span-good">${randomNumber}</span> en <span class="span-good">${counter}</span> essais. Félicitation !`;
    isGameOver = true;
    replayButton();
  } else if (parseGuessedNumber < randomNumber) {
    GuessedNumber.value = "";
    counter++;
    gameCounter();
    goodNumber.innerHTML = `C'est plus que <span class="span-good">${parseGuessedNumber}</span>`;
  } else if (parseGuessedNumber > randomNumber) {
    GuessedNumber.value = "";
    counter++;
    gameCounter();
    goodNumber.innerHTML = `C'est moins que <span class="span-good">${parseGuessedNumber}</span>`;
  } else {
    goodNumber.innerHTML = "C'est vide...";
  }
}

form.addEventListener("submit", userGuess);
replayBtn.addEventListener("click", refreshPage);

const GuessedNumber = document.getElementById("guess-number");
const form = document.getElementById("form");
const goodNumber = document.getElementById("good-number");
const timeLeft = document.getElementById("time-left");
const replayBtn = document.getElementById("replay-btn");

let randomNumber = Math.round(Math.random() * 1000);
let counter = 1;
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

// Fonction qui calcule le temps qu'il reste dans la partie et l'affiche sur la page.
function timeCalcul() {
  const countDown = new Date().getTime() + 60000;
  const x = setInterval(function () {
    const timeNow = new Date().getTime();
    const distance = countDown - timeNow;
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (!isGameOver) {
      timeLeft.innerHTML = `Il vous reste ${seconds} secondes !`;
    }

    if (seconds <= 0) {
      clearInterval(x);
      timeLeft.innerHTML = `Temps écoulé ! Le bon nombre était : ${randomNumber}. Vous n'avez pas trouvé le nombre en ${
        counter - 1
      } essais.`;
      isGameOver = true;
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
    goodNumber.innerHTML = `Vous avez trouvé le bon nombre : ${randomNumber} en ${counter} essais. Félicitation !`;
    isGameOver = true;
    replayButton();
  } else if (parseGuessedNumber < randomNumber) {
    GuessedNumber.value = "";
    counter++;
    goodNumber.innerHTML = `C'est plus que ${parseGuessedNumber}`;
  } else if (parseGuessedNumber > randomNumber) {
    GuessedNumber.value = "";
    counter++;
    goodNumber.innerHTML = `C'est moins que ${parseGuessedNumber}`;
  } else {
    goodNumber.innerHTML = "C'est vide...";
  }
}

form.addEventListener("submit", userGuess);
replayBtn.addEventListener("click", refreshPage);

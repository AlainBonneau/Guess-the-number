const GuessedNumber = document.getElementById("guess-number");
const form = document.getElementById("form");
const goodNumber = document.getElementById("good-number");
const timeLeft = document.getElementById("time-left");

let randomNumber = Math.round(Math.random() * 1000);
let counter = 1;
let isGameOver = false;
let isCountOn = false;
console.log(randomNumber);

function refreshPage() {
  location.reload();
}

function timeCalcul() {
  const countDown = new Date().getTime() + 10000;
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
    }
  }, 1000);
}

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

  console.log(GuessedNumber.value);
  if (parseGuessedNumber === randomNumber) {
    goodNumber.innerHTML = `Vous avez trouvé le bon nombre : ${randomNumber} en ${counter} essais. Félicitation !`;
  } else if (parseGuessedNumber < randomNumber) {
    GuessedNumber.value = "";
    counter++;
    goodNumber.innerHTML = `C'est plus que ${parseGuessedNumber}`;
  } else if (parseGuessedNumber > randomNumber) {
    GuessedNumber.value = "";
    counter++;
    goodNumber.innerHTML = `C'est moins que ${parseGuessedNumber}`;
  } else {
    console.log("C'est vide");
    goodNumber.innerHTML = "C'est vide...";
  }
}

form.addEventListener("submit", userGuess);

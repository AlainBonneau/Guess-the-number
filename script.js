const GuessedNumber = document.getElementById("guess-number");
const form = document.getElementById("form");
const goodNumber = document.getElementById("good-number");

let randomNumber = Math.round(Math.random() * 100);
let counter = 1;
console.log(randomNumber);

function userGuess(e) {
  e.preventDefault();
  const parseGuessedNumber = parseInt(GuessedNumber.value);
  console.log(GuessedNumber.value);
  if (parseGuessedNumber === randomNumber) {
    goodNumber.innerHTML = `Vous avez trouvé le bon nombre : ${randomNumber}`;
  } else if (parseGuessedNumber < randomNumber) {
    GuessedNumber.value = "";
    goodNumber.innerHTML = `C'est plus que ${parseGuessedNumber}`;
  } else if (parseGuessedNumber > randomNumber) {
    GuessedNumber.value = "";
    goodNumber.innerHTML = `C'est moins que ${parseGuessedNumber}`;
  } else {
    console.log("Erreur");
  }
}

form.addEventListener("submit", userGuess);

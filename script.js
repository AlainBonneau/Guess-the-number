const GuessedNumber = document.getElementById("guess-number");
const form = document.getElementById("form");
const goodNumber = document.getElementById("good-number");

let randomNumber = Math.round(Math.random() * 100);
console.log(randomNumber);

function userGuess(e) {
  e.preventDefault();
  console.log(GuessedNumber.value);
}

form.addEventListener("submit", userGuess);

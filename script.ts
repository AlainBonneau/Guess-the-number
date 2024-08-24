const GuessedNumber = document.getElementById("guess-number") as HTMLInputElement;
const form = document.getElementById("form") as HTMLFormElement;
const goodNumber = document.getElementById("good-number") as HTMLParagraphElement;
const timeLeft = document.getElementById("time-left") as HTMLParagraphElement;
const replayBtn = document.getElementById("replay-btn") as HTMLButtonElement;
const tryCount = document.getElementById("try-count") as HTMLParagraphElement;
const gameOver = document.getElementById("game-over") as HTMLParagraphElement;

let randomNumber: number = Math.round(Math.random() * 1000);
let counter: number = 1;
let tryCounter: number = 10;
let isGameOver: boolean = false;
let isCountOn: boolean = false;


// Fonction qui permet de rafraîchir la page.
function refreshPage(): void {
  location.reload();
}

// Fonction qui affiche le bouton "Rejouer".
function replayButton(): void {
  replayBtn.classList.remove("replay-btn--hidden");
}

// fonction qui diminue le nombre d'essai du joueur à chaque fois qu'il se trompe
function gameCounter(): void {
  tryCounter--;
  const attemptWord: string = tryCounter === 1 ? 'essai' : 'essais';
  tryCount.innerHTML = `Il vous reste <span class="span-good">${tryCounter}</span> ${attemptWord}`;

  if (tryCounter === 0) {
    isGameOver = true;
    tryCount.innerHTML = `Vous avez <span class="span-good">épuisé</span> tous vos essais.`;
    timeLeft.innerHTML = `Temps écoulé ! Le bon nombre était : <span class="span-good">${randomNumber}</span>. Vous n'avez pas trouvé le nombre en <span class="span-good">${counter - 1}</span> essais.`;
    blockInput();
    gameOverBtn();
    replayButton();
  }
}


// Fonction qui affiche un bouton gameover si l'utilisateur perd.
function gameOverBtn(): void {
  if (isGameOver) {
    gameOver.classList.add("game-over");
    gameOver.innerHTML = "GAMEOVER";
  }
}

// Fonction qui calcule le temps qu'il reste dans la partie et l'affiche sur la page.
function timeCalcul(): void {
  const countDown: number = new Date().getTime() + 60000;
  const x: number = setInterval(function () {
    const timeNow: number = new Date().getTime();
    const distance: number = countDown - timeNow;
    const seconds: number = Math.floor((distance % (1000 * 60)) / 1000);

    if (isGameOver) {
      clearInterval(x);
    }

    if (!isGameOver) {
      timeLeft.innerHTML = `Il vous reste <span class="span-good">${seconds}</span> secondes !`;
    }

    if (seconds <= 0) {
      clearInterval(x);
      timeLeft.innerHTML = `Temps écoulé ! Le bon nombre était : <span class="span-good">${randomNumber}</span>. Vous n'avez pas trouvé le nombre en <span class="span-good">${
        counter - 1
      }</span> essais.`;
      isGameOver = true;
      blockInput();
      gameOverBtn();
      replayButton();
    }
  }, 1000);
}

// Fonction qui bloque l'input une fois la partie terminée.
function blockInput(): void {
  GuessedNumber.setAttribute("readonly", "");
}

//Fonction principale de l'application, c'est elle qui se lance une fois que l'utilisateur clique sur le bouton "Jouer". Elle indique à celui-ci si le nombre qu'il donne est trop petit, trop grand ou s'il s'agit du bon numéro.
function userGuess(e: Event): void {
  e.preventDefault();
  const parseGuessedNumber: number = parseInt(GuessedNumber.value, 10);

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
    goodNumber.innerHTML = `Vous avez trouvé le bon nombre : <span class="span-good">${randomNumber}</span> en <span class="span-good">${
      counter - 1
    }</span> essais. Félicitation !`;
    isGameOver = true;
    blockInput();
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



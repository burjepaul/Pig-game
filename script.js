'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let currentScore, score, activePlayer, plaing;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');

  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  plaing = true;

  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (plaing) {
    const dice = Math.trunc(Math.random() * 5) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (plaing) {
    score[activePlayer] += currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      plaing = false;
    } else switchPlayer();
  }
});

btnNew.addEventListener('click', init);

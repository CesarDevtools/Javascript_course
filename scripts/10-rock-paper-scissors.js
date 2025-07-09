// Recupera el puntaje almacenado en localStorage o lo inicializa si no existe.
// El puntaje lleva la cuenta de victorias, derrotas y empates.
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

// Actualiza el elemento HTML que muestra el puntaje.
updateScoreElement();

/**
 * Función principal que ejecuta una ronda del juego.
 * Recibe el movimiento del jugador, elige el movimiento de la computadora,
 * determina el resultado, actualiza el puntaje y la interfaz.
 */
function playGame(playerMove) {
  const computerMove = pickComputerMove(); // Elige movimiento aleatorio para la computadora.

  let result = '';

  // Determina el resultado según el movimiento del jugador y la computadora.
  if (playerMove === 'scissors') {
    // Si el jugador elige tijeras:
    if (computerMove === 'rock') {
      result = 'You lose.'; // Tijeras pierde contra piedra.
    } else if (computerMove === 'paper') {
      result = 'You win.'; // Tijeras gana a papel.
    } else if (computerMove === 'scissors') {
      result = 'Tie.'; // Empate si ambos eligen tijeras.
    }

  } else if (playerMove === 'paper') {
    // Si el jugador elige papel:
    if (computerMove === 'rock') {
      result = 'You win.'; // Papel gana a piedra.
    } else if (computerMove === 'paper') {
      result = 'Tie.'; // Empate si ambos eligen papel.
    } else if (computerMove === 'scissors') {
      result = 'You lose.'; // Papel pierde contra tijeras.
    }
    
  } else if (playerMove === 'rock') {
    // Si el jugador elige piedra:
    if (computerMove === 'rock') {
      result = 'Tie.'; // Empate si ambos eligen piedra.
    } else if (computerMove === 'paper') {
      result = 'You lose.'; // Piedra pierde contra papel.
    } else if (computerMove === 'scissors') {
      result = 'You win.'; // Piedra gana a tijeras.
    }
  }

  // Actualiza el puntaje según el resultado.
  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  // Guarda el puntaje actualizado en localStorage.
  localStorage.setItem('score', JSON.stringify(score));

  // Actualiza el puntaje en la interfaz.
  updateScoreElement();

  // Muestra el resultado de la ronda en la interfaz.
  document.querySelector('.js-result').innerHTML = result;

  // Muestra los movimientos del jugador y la computadora con imágenes.
  document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

/**
 * Actualiza el elemento HTML que muestra el puntaje acumulado.
 */
function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

/**
 * Elige aleatoriamente el movimiento de la computadora: piedra, papel o tijeras.
 * Usa un número aleatorio para decidir el movimiento.
 */
function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  // Divide el rango [0,1) en tres partes iguales para cada movimiento.
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}
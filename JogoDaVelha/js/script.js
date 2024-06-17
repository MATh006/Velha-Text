const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameActive = true;
let player1Name = 'Jogador 1';
let player2Name = 'Jogador 2';
let player1Points = 0;
let player2Points = 0;

player1Input.addEventListener('input', () => {
  player1Name = player1Input.value || 'Jogador 1';
});

player2Input.addEventListener('input', () => {
  player2Name = player2Input.value || 'Jogador 2';
});

restartButton.addEventListener('click', startGame);

function startGame() {
  currentPlayer = 'X';
  gameActive = true;
  message.innerText = '';
  cells.forEach(cell => {
    cell.innerText = '';
    cell.addEventListener('click', handleCellClick, { once: true });
  });
}

startGame();

function handleCellClick(e) {
  const cell = e.target;
  if (!gameActive || cell.innerText !== '') return;
  cell.innerText = currentPlayer;
  if (checkWin()) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchPlayer();
  }
}

function checkWin() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningConditions.some(condition => {
    return condition.every(index => {
      return cells[index].innerText === currentPlayer;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.innerText !== '';
  });
}

function endGame(draw) {
  if (draw) {
    message.innerText = 'Empate!';
  } else {
    message.innerText = `${currentPlayer === 'X' ? player1Name : player2Name} venceu!`;
    if (currentPlayer === 'X') {
      player1Points++;
      player1Score.innerText = player1Points;
    } else {
      player2Points++;
      player2Score.innerText = player2Points;
    }
  }
  gameActive = false;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

'use strict';
function createMat(ROWS, COLS) {
  var mat = [];
  for (var i = 0; i < ROWS; i++) {
    var row = [];
    for (var j = 0; j < COLS; j++) {
      row.push('');
    }
    mat.push(row);
  }
  return mat;
}

// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
  return {
    type: SKY,
    gameObject: gameObject,
  };
}
// function getElCell(pos) {
//   return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`);
// }

function getElCell(pos) {
  var cellSelector = '.' + getClassName(pos);
  return document.querySelector(cellSelector);
}

function cleanCell(pos) {
  updateCell(pos, null);
  pos.i--;
  updateCell(pos, null);
}

// function getEmptyCell() {
//   var positions = [];
//   for (var i = 0; i < gBoard.length; i++) {
//     for (var j = 0; j < gBoard[i].length; j++) {
//       var cell = gBoard[i][j];
//       if (cell.type !== WALL && cell.gameObject === null) {
//         if (i === 0 || j === 0 || i === gBoard.length - 1 || j === gBoard[0].length - 1) continue;
//         // if (gBoard[i][j].type === TARGET) continue;
//         positions.push({ i, j });
//       }
//     }
//   }
//   return positions[getRandomInt(0, positions.length)] || false;
// }

function setInitialGameScore() {
  document.querySelector('.score').innerHTML = gScore;
}

function updateScore(amount) {
  gScore += amount;

  document.querySelector('.score').innerHTML = gScore;
}

// Returns the class name for a specific cell
function getClassName(location) {
  var cellClass = 'cell-' + location.i + '-' + location.j;
  return cellClass;
}

function openModal(msg) {
  const elModal = document.querySelector('.modal');
  const elSpan = elModal.querySelector('.msg');
  elSpan.innerText = msg;
  // elModal.style.display = 'block';
}

function closeModal() {
  const elModal = document.querySelector('.modal');
  elModal.style.display = 'none';
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

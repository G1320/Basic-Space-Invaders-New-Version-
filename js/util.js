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

function scanNegs(cellI, cellJ, thing) {
  // var thingCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= gBoard[i].length) continue;
      if (gBoard[i][j].type === thing) return true;
    }
  }
  return false;
}

// function scanNegs2(cellI, cellJ, thing) {
//   // var thingCount = 0;
//   for (var i = cellI - 1; i <= cellI + 1; i++) {
//     if (i < 0 || i >= gBoard.length) continue;
//     for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//       clearAndPaintCell(cellI, cellJ, 'var(--color-selected');
//       // if (j < 0 || j >= gBoard[i].length) continue;
//       // if (gBoard[i][j].type === thing)
//     }
//   }
// }

function paintNegs(cellI, cellJ) {
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= gBoard[i].length) continue;
      if (gBoard[i][j].type !== WALL) {
        paintCell(i, j, 'var(--color-selected)');
      }
    }
  }
}

function paintCell(i, j, color) {
  var cellClass = getClassName({ i, j });
  var elCell = document.querySelector(`.${cellClass}`);
  elCell.style.backgroundColor = color;
  if (gBoard[i][j].gameObject == ALIEN) {
    gGame.aliensCount--;
    updateCell({ i, j });
    updateScore(10);
  }
}

function getEmptyCellInRow(rowIdx) {
  var positions = [];
  for (var i = 0; i < gBoard[rowIdx].length - 1; i++) {
    var cell = gBoard[rowIdx][i];
    if (cell.type !== WALL && cell.gameObject === null) {
      positions.push({ i: rowIdx, j: i });
    }
  }
  return positions[getRandomInt(0, positions.length)] || false;
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
  var elBoxCounter = document.querySelector('.score');
  elBoxCounter.innerHTML = gScore;
}

function updateScore(amount) {
  // reduce to single parameter
  gScore += amount;

  var elScore = document.querySelector('.score');
  elScore.innerHTML = gScore;
}

function clearAndPaintCell(i, j, color) {
  var cellClass = getClassName({ i, j });
  var elCell = document.querySelector(`.${cellClass}`);
  elCell.innerText = '';
  elCell.style.backgroundColor = color;
}
// Returns the class name for a specific cell
function getClassName(location) {
  var cellClass = 'cell-' + location.i + '-' + location.j;
  return cellClass;
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

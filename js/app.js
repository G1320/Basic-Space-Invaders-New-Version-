'use strict';

const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 8;
const ALIENS_ROW_COUNT = 3;

const HERO = '🦸‍♂️';
const ALIEN = '👽';
const LASER = '⤊';
const INVERTED_LASER = '🔰';
const CANDY = '🍩';
const SKY = 'sky';
const WALL = 'wall';
const HIT_BUNKER = 'hit';
const BUNKER = 'bunker';

var gScore;
var gLazerPos;
var gAlienMoveInterval;
var gIsFrozen;
var gRandColor;
var gCandyInterval;
var gAlienLaserInterval;
var gAlienShootInterval;
var isModalOpen = true;

var gBoard;
var gGame = {
  isOn: false,
  aliensCount: 0,
};

function startGame() {
  init();
  gCandyInterval = setInterval(addCandy, 10000);
  gAlienShootInterval = setInterval(alienShoot, 4800);
}
// Called when game loads
function init() {
  clearInterval(gCandyInterval);
  clearInterval(gAlienShootInterval);
  clearInterval(gAlienMoveInterval);
  gRandColor = getRandomColor();

  gScore = 0;
  gGame.aliensCount = 0;
  gIsFrozen = false;

  gBoard = createBoard();
  renderBoard(gBoard);
  setInitialGameScore();
  var msg = 'Welcome!';
  if (isModalOpen) {
    openModal(msg);
    isModalOpen = false;
  }
}

// Create and returns the board with aliens on top, ground at bottom // use the functions: createCell, createHero, createAliens
function createBoard() {
  var board = [];
  board = createMat(14, 14);
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      // Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
      board[i][j] = { type: SKY, gameObject: null };
      if (i === 0 || i === board.length - 1 || j === 0 || j === board[i].length - 1)
        board[i][j] = { type: WALL, gameObject: null };
    }
  }
  board[11][11] = { type: BUNKER, gameObject: null };
  board[11][8] = { type: BUNKER, gameObject: null };
  board[11][5] = { type: BUNKER, gameObject: null };
  board[11][2] = { type: BUNKER, gameObject: null };
  addAliens(board);
  createHero(board);
  return board;
}

// Render the board as a <table> to the page
function renderBoard(board) {
  var elBoard = document.querySelector('.board');
  var strHTML = '';

  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>\n';
    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j];
      var cellClass = getClassName({ i, j });
      var styleStr = '';
      switch (currCell.type) {
        case SKY:
          cellClass += ' sky';
          break;
        case WALL:
          cellClass += ' wall';
          break;
        case BUNKER:
          cellClass += ' bunker';
          styleStr = `style="background-color:${gRandColor}"`;
          break;
        case HIT_BUNKER:
          cellClass += ' hit';
          break;
      }
      strHTML += `\t<td ${styleStr} class="cell ${cellClass}">`;
      switch (currCell.gameObject) {
        case HERO:
          strHTML += HERO;
          break;
        case ALIEN:
          strHTML += ALIEN;
          break;
      }
      strHTML += '\t</td>\n';
    }
    strHTML += '</tr>\n';
  }
  elBoard.innerHTML = strHTML;
}

// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
  return {
    type: SKY,
    gameObject: gameObject,
  };
}

function addCandy() {
  var location = addElement(CANDY);
  // UPDATE THE MODEL & DOM
  setTimeout(updateCell, 5000, location);
}

function addElement(element) {
  var location = getEmptyCellPosInRow(1);
  if (!location) return;
  // UPDATE THE MODEL & DOM
  updateCell(location, getElementHTMLWithGlow(element));
  gBoard[location.i][location.j].gameObject = element;

  return location;
}

function getElementHTMLWithGlow(element) {
  return `<div style="animation: animation-glow 0.5s ease-in-out infinite alternate; margin: auto;>${element}</div>`;
}

function getEmptyCellPosInRow(rowIdx) {
  var positions = [];
  for (var i = 0; i < gBoard[rowIdx].length - 1; i++) {
    var cell = gBoard[rowIdx][i];
    if (cell.type !== WALL && cell.gameObject === null) {
      positions.push({ i: rowIdx, j: i });
    }
  }
  return positions[getRandomInt(0, positions.length)] || null;
}

function scanNegs(cellI, cellJ, thing) {
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= gBoard[i].length) continue;
      if (gBoard[i][j].type === thing) return true;
    }
  }
  return false;
}

function updateCell(pos, gameObject = null) {
  if (gLazerPos === null && gGame.aliensCount === 0) openModal('You Win!');

  gBoard[pos.i][pos.j].gameObject = gameObject;
  var elCell = getElCell(pos);
  elCell.innerHTML = gameObject || '';

  if (gLazerPos === pos) {
    elCell.classList.add('laser-bg');
    setTimeout(() => elCell.classList.remove('laser-bg'), 100);
  }

  if (gBoard[pos.i][pos.j].type === BUNKER) {
    if (elCell.classList.contains('hit')) {
      elCell.classList.remove('bunker');
      elCell.classList.add('animation-spin');
      gBoard[pos.i][pos.j].type = HIT_BUNKER;
      return;
    } else elCell.classList.add('hit');
  }
}

function freeze(elBtn) {
  if (!gIsFrozen) {
    elBtn.innerText = 'FREEZE';
    gAlienMoveInterval = setInterval(() => shiftBoardRight(gBoard), 1000);
  } else {
    elBtn.innerText = 'UNFREEZE';
    clearInterval(gAlienMoveInterval);
  }
  gIsFrozen = !gIsFrozen;
}

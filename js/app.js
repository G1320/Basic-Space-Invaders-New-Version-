'use strict';

const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 8;
const ALIENS_ROW_COUNT = 3;

const HERO = '🦸‍♂️';
const ALIEN = '👽';
const LASER = '⤊';
const SKY = 'sky';
const WALL = 'wall';
const BUNKER = 'bunker';

var gScore;
var gLazerPos;
var gAlienMoveInterval;
var gIsFrozen;

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard;
var gGame = {
  isOn: false,
  aliensCount: 0,
};
// var GHero.pos;
// Called when game loads
function init() {
  gScore = 0;
  gIsFrozen = false;

  // GHero.pos = { i: 12, j: 6 };
  gBoard = createBoard();
  renderBoard(gBoard);
  setInitialGameScore();

  console.log(gBoard);
  freeze(elBtn);
}

function freeze(elBtn) {
  if (!gIsFrozen) {
    elBtn.innerText = 'Freeze';
  } else elBtn.innerText = 'Frozen';
  gIsFrozen = !gIsFrozen;
  if (!gAlienMoveInterval) gAlienMoveInterval = setInterval(() => shiftBoardRight(gBoard), 1000);
  else clearInterval(gAlienMoveInterval);
}

// Create and returns the board with aliens on top, ground at bottom // use the functions: createCell, createHero, createAliens
function createBoard() {
  var board = [];
  board = createMat(14, 14);
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
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
  console.log('OG board: ', board);
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
      switch (currCell.type) {
        case SKY:
          cellClass += ' sky';
          break;
        case WALL:
          cellClass += ' wall';
          break;
        case BUNKER:
          cellClass += ' bunker';
          break;
      }
      strHTML += `\t<td class="cell ${cellClass}" onclick="handleMove(${i}, ${j})">`;
      switch (currCell.gameObject) {
        case HERO:
          strHTML += HERO;
          break;
        case ALIEN:
          strHTML += ALIEN;
          break;
        case LASER:
          strHTML += LASER;
          break;
      }
      strHTML += '\t</td>\n';
    }
    strHTML += '</tr>\n';
  }
  elBoard.innerHTML = strHTML;
}

function createHero(board) {
  board[gHero.pos.i][gHero.pos.j] = createCell(HERO);
}

// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
  return {
    type: SKY,
    gameObject: gameObject,
  };
}
function updateCell(pos, gameObject = null) {
  gBoard[pos.i][pos.j].gameObject = gameObject;
  var elCell = getElCell(pos);
  elCell.innerHTML = gameObject || '';
}

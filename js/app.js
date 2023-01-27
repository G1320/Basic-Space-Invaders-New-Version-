'use strict';

const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 8;
const ALIENS_ROW_COUNT = 3;

const HERO = '🦸‍♂️';
const ALIEN = '👽';
const LASER = '⤊';
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

var gBoard;
var gGame = {
  isOn: false,
  aliensCount: 0,
};
// Called when game loads
function init() {
  gScore = 0;
  gGame.aliensCount = 0;
  gIsFrozen = false;
  gCandyInterval = setInterval(() => addCandy(), 10000);

  gRandColor = getRandomColor();
  gBoard = createBoard();
  renderBoard(gBoard);
  setInitialGameScore();
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
      strHTML += `\t<td ${styleStr} class="cell ${cellClass}" onclick="handleMove(${i}, ${j})">`;
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
  updateCell(location, element);

  return location;
}

function getEmptyCellPosInRow(rowIdx) {
  var positions = [];
  for (var i = 0; i < gBoard[rowIdx].length - 1; i++) {
    var cell = gBoard[rowIdx][i];
    if (cell.type !== WALL && cell.gameObject === null) {
      positions.push({ i: rowIdx, j: i });
    }
  }
  return positions[getRandomInt(0, positions.length)] || false;
}

function updateCell(pos, gameObject = null) {
  gBoard[pos.i][pos.j].gameObject = gameObject;
  var elCell = getElCell(pos);
  elCell.innerHTML = gameObject || '';

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
  } else elBtn.innerText = 'UNFREEZE';
  gIsFrozen = !gIsFrozen;
  console.log('gAlienMoveInterval: ', gAlienMoveInterval);
  !gAlienMoveInterval
    ? (gAlienMoveInterval = setInterval(() => shiftBoardRight(gBoard), 1000))
    : clearInterval(gAlienMoveInterval);
}

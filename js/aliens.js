'use strict';

const ALIEN_SPEED = 500;
var gAlienInterval;
// The following two variables represent the part of the matrix (some rows) // that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row
var gAliensTopRowIdx;
var gAliensBottomRowIdx;
var gIsAlienFreeze = true;

function addAliens(board) {
  for (let i = 2; i < 5; i++) {
    for (let j = 3; j < board.length - 3; j++) {
      board[i][j] = { type: SKY, gameObject: ALIEN };
      gGame.aliensCount++;
    }
  }
}

function handleAlienHit(pos) {
  updateCell(pos, null);
  pos.i--;
  updateCell(pos, null);
  gHero.isShoot = false;
  gGame.aliensCount--;
  clearInterval(gLaserInterval);
  updateScore(10);
  gLazerPos = null;
  console.log('Hit Alien');
  if (gGame.aliensCount === 0) {
    console.log('You win!');
  }
}

function shiftBoardRight(board, fromI = 2, toI = 3) {
  for (let i = fromI; i < board.length - toI; i++) {
    for (let j = 0; j < board[0].length - toI; j++) {
      if (board[i][j].type === WALL) continue;
      if (board[i][j].gameObject === ALIEN) {
        var temp = board[i][j].gameObject;
        updateCell({ i, j }, null);
        board[i][j - 1].gameObject = temp;
        if (scanNegs(i, j - 1, WALL)) {
          clearInterval(gAlienMoveInterval);
          // gAlienMoveInterval = setInterval(() => shiftBoardLeft(board), 1000);
        }
      }
    }
  }
  // console.log(board);
  renderBoard(board);
}

function shiftBoardLeft(board, fromI = 2, toI = 1) {
  // console.log('Yo');
  for (let i = 2; i < board.length - 3; i++) {
    for (let j = 0; j < board[0].length - 2; j++) {
      if (board[i][j].type === WALL) continue;
      if (board[i][j].gameObject === ALIEN) {
        var temp = board[i][j].gameObject;
        // board[i][j].gameObject === null;
        updateCell({ i, j }, null);
        board[i][j + 1].gameObject = temp;
        if (scanNegs(i, j + 1, WALL)) {
          clearInterval(gAlienMoveInterval);
          return;
        }
      }
    }
  }
  // console.log(board);
  renderBoard(board);
}

function alienShoot() {
  var pos = getEmptyCellPosInRow(4);

  gAlienLaserInterval = setInterval(blinkAlienLaser, LASER_SPEED, pos);
}

function blinkAlienLaser(pos) {
  // if (!gHero.isShoot) return;
  var nextCell = gBoard[pos.i + 1][pos.j];
  var currCell = gBoard[pos.i][pos.j];
  // if (nextCell.gameObject === CANDY) return handleCandy(pos);
  // if (nextCell.gameObject === ALIEN) return handleAlienHit(pos);
  if (nextCell.type === WALL || currCell.type === BUNKER) {
    console.log(`nextCell Hit ${nextCell.type}`);
    console.log(`CurrCell Hit ${currCell.type}`);
    updateCell(pos, null);
    gHero.isShoot = false;
    clearInterval(gAlienLaserInterval);
    gLazerPos = null;
    return;
  }

  updateCell(pos, null);
  pos.i++;
  updateCell(pos, LASER);
}

function shiftBoardDown(board, fromI, toI) {}
// runs the interval for moving aliens side to side and down // it re-renders the board every time
// when the aliens are reaching the hero row - interval stops function moveAliens() {}

'use strict';

const ALIEN_SPEED = 500;
var gIntervalAliens;
// The following two variables represent the part of the matrix (some rows) // that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row
var gAliensTopRowIdx;
var gAliensBottomRowIdx;
var gIsAlienFreeze = true;

var gAlienMoveInterval;
function addAliens(board) {
  for (let i = 2; i < 5; i++) {
    for (let j = 3; j < board.length - 3; j++) {
      board[i][j] = { type: SKY, gameObject: ALIEN };
      // aliensCount++;
    }
  }
}
function handleAlienHit(pos) {
  updateScore(10);
  // if (gBoard[pos.i][pos.j].gameObject === ALIEN) {
  console.log('Hit');
  // }
}

// function shiftBoardRight(board, fromI, toI) {
//   var moveDiff = -1;
//   //TODO: use fromI and toI in the inner loop
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[0].length; j++) {
//       if (board[i][j].type === WALL) continue;
//       if (board[i][j].gameObject !== ALIEN) continue;
//       updateCell({ i, j }, null);
//       var newPos = { i, j: j - 1 };
//       board[i][j] = board[newPos.i][newPos.j];
//       updateCell(newPos, ALIEN);
//     }
//   }
// }
function shiftBoardLeft(board, fromI, toI) {}
function shiftBoardDown(board, fromI, toI) {}
// runs the interval for moving aliens side to side and down // it re-renders the board every time
// when the aliens are reaching the hero row - interval stops function moveAliens() {}

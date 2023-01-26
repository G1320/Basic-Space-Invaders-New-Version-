'use strict';

const LASER_SPEED = 80;
var gLaserInterval;
var gHero = {
  pos: { i: 12, j: 6 },
  isShoot: false,
};
// creates the hero and place it on board
function createHero(board) {
  board[12][6] = HERO;
  return createCell(HERO);
}
// Handle game keys
function handleKey(event) {
  var i = gHero.pos.i;
  var j = gHero.pos.j;

  switch (event.key) {
    case 'ArrowLeft':
      j--;
      break;
    case 'ArrowRight':
      j++;
      break;
    case ' ':
      if (!gHero.isShoot) {
        clearInterval(gLaserInterval);
        console.log(gBoard);
        shoot();
      }
      // moveHero(i, j);
      break;
  }
  moveHero(i, j);
}
// Move the hero right (1) or left (-1)
function moveHero(i, j) {
  updateCell(gHero.pos, null);
  gHero.pos = { i, j };
  updateCell(gHero.pos, HERO);
}
// renders a LASER at specific cell for short time and removes it function blinkLaser(pos) {}
function blinkLaser(pos) {
  if (!gHero.isShoot) return;
  var nextCell = gBoard[gLazerPos.i - 1][gLazerPos.j];
  var currCell = gBoard[gLazerPos.i][gLazerPos.j];
  if (
    currCell.type === WALL ||
    nextCell.type === WALL ||
    currCell.type === BUNKER ||
    nextCell.type === BUNKER
  ) {
    console.log('Hit Wall');
    updateCell(gLazerPos, null);
    gLazerPos = { i: gLazerPos.i - 1, j: gLazerPos.j };
    // updateCell(gLazerPos, null);
    gHero.isShoot = false;
    return;
  }
  if (nextCell.gameObject === ALIEN) {
    handleAlienHit({ gLazerPos });
    updateCell(gLazerPos, null);
    gLazerPos = { i: gLazerPos.i - 1, j: gLazerPos.j };
    updateCell(gLazerPos, null);
    gHero.isShoot = false;
    return;
  }
  updateCell(gLazerPos, null);
  gLazerPos = { i: gLazerPos.i - 1, j: gLazerPos.j };
  updateCell(gLazerPos, LASER);
}

// Sets an interval for shutting (blinking) the laser up towards aliens function shoot() {}
function shoot() {
  gHero.isShoot = true;
  gLazerPos = { i: gHero.pos.i - 1, j: gHero.pos.j };

  gLaserInterval = setInterval(blinkLaser, LASER_SPEED, gLazerPos);
}

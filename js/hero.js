'use strict';

const LASER_SPEED = 80;
var gLaserInterval;
var gHero = {
  pos: { i: 12, j: 6 },
  isShoot: false,
};
// creates the hero and place it on board
function createHero(board) {
  board[gHero.pos.i][gHero.pos.j] = createCell(HERO);
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
      if (gHero.isShoot) return;
      clearInterval(gLaserInterval);
      shoot();
      break;
    case 'n':
      console.log(gLazerPos);
      paintNegs(gLazerPos.i, gLazerPos.j);

      break;
  }
  moveHero(i, j);
}
// Move the hero right (1) or left (-1)
function moveHero(i, j) {
  if (gBoard[i][j].type === WALL) return;
  updateCell(gHero.pos, null);
  gHero.pos = { i, j };
  updateCell(gHero.pos, HERO);
}
// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) {
  if (!gHero.isShoot) return;
  var nextCell = gBoard[pos.i - 1][pos.j];
  var currCell = gBoard[pos.i][pos.j];
  if (nextCell.type === WALL || currCell.type === BUNKER || nextCell.type === BUNKER) {
    console.log('Hit Wall');
    updateCell(pos, null);
    gHero.isShoot = false;
    clearInterval(gLaserInterval);
    return;
  }
  if (nextCell.gameObject === CANDY) return handleCandy(pos);
  if (nextCell.gameObject === ALIEN) return handleAlienHit(pos);

  updateCell(pos, null);
  pos.i--;
  updateCell(pos, LASER);
}

function handleCandy(pos) {
  updateCell(pos, null);
  pos.i--;
  updateCell(pos, null);
  gHero.isShoot = false;
  gGame.aliensCount--;
  clearInterval(gLaserInterval);
  updateScore(50);
  console.log('Hit Candy');
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {
  gHero.isShoot = true;
  gLazerPos = { i: gHero.pos.i - 1, j: gHero.pos.j };

  gLaserInterval = setInterval(blinkLaser, LASER_SPEED, gLazerPos);
}

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
  var i = gGamerPos.i;
  var j = gGamerPos.j;

  switch (event.key) {
    case 'ArrowLeft':
      j--;
      console.log('Left');
      break;
    case 'ArrowRight':
      console.log('Right');
      j++;
      break;
    case ' ':
      gLazerPos = gGamerPos;
      shoot();
      // moveHero(i, j);
      break;
  }
  moveHero(i, j);
}
// Move the hero right (1) or left (-1)
function moveHero(i, j) {
  updateCell(gGamerPos, null);
  gGamerPos = { i, j };
  updateCell(gGamerPos, HERO);
}
// renders a LASER at specific cell for short time and removes it function blinkLaser(pos) {}
function blinkLaser(pos) {
  updateCell(gLazerPos, null);
  gLazerPos = { i: gLazerPos.i - 1, j: gLazerPos.j };
  handleAlienHit(gLazerPos);
  updateCell(gLazerPos, LASER);
}

// Sets an interval for shutting (blinking) the laser up towards aliens function shoot() {}
function shoot() {
  console.log(gBoard);
  gHero.isShoot = true;
  gLaserInterval = setInterval(blinkLaser, 500, gLazerPos);
}

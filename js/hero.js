'use strict';

const LASER_SPEED = 80;
var gLaserInterval;
var gHero = {
  pos: { i: 12, j: 6 },
  isShoot: false,
  deg: null,
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
      gHero.deg = -90;
      j--;
      break;
    case 'ArrowRight':
      gHero.deg = 90;
      j++;
      break;
    case ' ':
      if (gHero.isShoot) return;
      clearInterval(gLaserInterval);
      shoot();
      return;
    case 'n':
      if (!gLazerPos) return;
      BlowUpNegs(gLazerPos.i, gLazerPos.j);
      gLazerPos = null;
      return;
    default:
      return;
  }
  moveHero(i, j);
}
// Move the hero right (1) or left (-1)
function moveHero(i, j) {
  if (gBoard[i][j].type === WALL) return;
  updateCell(gHero.pos);
  gHero.pos = { i, j };
  updateCell(gHero.pos, getHeroHTML(gHero.deg));
  gBoard[i][j].gameObject = HERO;
  setTimeout(() => updateCell(gHero.pos, getHeroHTML()), 200);
  gBoard[i][j].gameObject = HERO;
}

function getHeroHTML(deg = 0) {
  return `<div style=" animation: animation-glow 1.8s ease-in infinite alternate; animation-delay: 0.4s; animation-iteration-count: 2; transform: rotate(${deg}deg); margin: auto; class="" ">${HERO}</div>`;
}

// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) {
  if (!gHero.isShoot) return;
  var nextCell = gBoard[pos.i - 1][pos.j];
  var currCell = gBoard[pos.i][pos.j];
  if (nextCell.gameObject === CANDY) return handleCandy(pos);
  if (nextCell.gameObject === ALIEN) return handleAlienHit(pos);
  if (nextCell.type === WALL || currCell.type === BUNKER) {
    // console.log(`nextCell Hit ${nextCell.type}`);
    // console.log(`CurrCell Hit ${currCell.type}`);
    updateCell(pos);
    gHero.isShoot = false;
    clearInterval(gLaserInterval);
    gLazerPos = null;
    return;
  }
  updateCell(pos);
  pos.i--;
  updateCell(pos, LASER);
}

function handleCandy(pos) {
  gHero.isShoot = false;
  gLazerPos = null;

  cleanCell(pos);
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

function BlowUpNegs(cellI, cellJ) {
  gHero.isShoot = false;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= gBoard[i].length) continue;
      if (gBoard[i][j].type !== WALL) {
        BlowUpCell(i, j, 'var(--color-selected)');
      }
    }
  }
  updateCell(gLazerPos, null);
}

function BlowUpCell(i, j, color) {
  var ellCell = document.querySelector(`.${getClassName({ i, j })}`);
  ellCell.style.backgroundColor = gRandColor;
  ellCell.style.transition = '0.05s';

  setTimeout(() => {
    ellCell.style.transition = '0.8s';
    ellCell.style.backgroundColor = 'var(--color-light-primary)';
    setTimeout(() => (ellCell.style.transition = '0.05s'), 800);
  }, 2000);
  switch (gBoard[i][j].gameObject) {
    case ALIEN:
      gGame.aliensCount--;
      console.log('Hit Alien');
      updateScore(10);
      break;
    case CANDY:
      console.log('Hit Candy');
      updateScore(50);
      break;
  }
  updateCell({ i, j });
}

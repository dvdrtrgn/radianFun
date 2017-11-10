import COLORS from './colors.js';
import Draw from './draw.js';
import Runner from './runner.js';
import Space from './space.js';
import Vector from './vector.js';

const W = window;
const C = W.console;
const AREA = new Space(W.innerWidth, W.innerHeight);
const MOUSE = new Vector(AREA.x, AREA.y);
const LOOP = new Runner();
const PAINT = new Draw('Test', AREA);

// ---------
// MOUSE

function followMouse(mover) {
  let acc = new Vector(MOUSE.x, MOUSE.y).sub(mover.loc);
  mover.vel.limit = acc.mag; // faster for far away
  acc.mag = 3; // obedience
  return acc;
}

const _watchMouse = (evt) => MOUSE.read(evt.offsetX, evt.offsetY);
W.addEventListener('mousemove', _watchMouse);

// ---------
// etc

const Rando = {
  color: () => COLORS[Rando.whole(COLORS.length - 1)],
  whole: (top = 9) => Math.random() * (1 + top) | 0,
  range: (lo, hi) => Math.random() * (hi - lo) + lo,
};

export {
  W, C,
  AREA, MOUSE, LOOP, PAINT,
  Rando,
  followMouse,
};

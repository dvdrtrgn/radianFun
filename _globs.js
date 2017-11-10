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
const _watchMouse = (evt) => MOUSE.read(evt.offsetX, evt.offsetY);

// ---------
// etc
W.addEventListener('mousemove', _watchMouse);

const Rando = {
  color: () => COLORS[Rando.whole(COLORS.length - 1)],
  whole: (top = 9) => Math.random() * (1 + top) | 0,
  range: (lo, hi) => Math.random() * (hi - lo) + lo,
};

export {
  W, C,
  AREA, MOUSE, LOOP, PAINT,
  Rando,
};

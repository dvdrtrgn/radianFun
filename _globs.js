import COLORS from './colors.js';
import Draw from './draw.js';
import Looper from './looper.js';
import Space from './space.js';

const W = window;
const C = W.console;
const AREA = new Space(W.innerWidth, W.innerHeight);
const LOOP = new Looper();
const PAINT = new Draw('Test', AREA);

// ---------
// etc

const Rando = {
  color: () => COLORS[Rando.whole(COLORS.length - 1)],
  whole: (top = 9) => Math.random() * (1 + top) | 0,
  range: (lo, hi) => Math.random() * (hi - lo) + lo,
};

export {
  W, C, AREA, LOOP, PAINT,
  Rando,
};

import COLORS from './lib/colors.js';
import Draw from './lib/draw.js';
import Looper from './lib/looper.js';
import Space from './lib/space.js';

const AREA = new Space(window.innerWidth, window.innerHeight);
const LOOP = new Looper();
const PAINT = new Draw('Paint', AREA);

// ---------
// etc

const Rando = {
  color: () => COLORS[Rando.whole(COLORS.length - 1)],
  whole: (top = 9) => (Math.random() * (1 + top)) | 0,
  range: (lo, hi) => Math.random() * (hi - lo) + lo,
};

export { AREA, LOOP, PAINT, Rando };

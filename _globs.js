/*global CSS_COLORS, Draw, Mover, Runner, Space, Vector, */
const W = window;
const C = W.console;
const AREA = new Space(W.innerWidth, W.innerHeight);
const MOUSE = new Vector(AREA.x, AREA.y);
const PAINT = new Draw('Test', AREA);
const _watchMouse = (evt) => MOUSE.read(evt.offsetX, evt.offsetY);

// ---------
// etc
W.addEventListener('mousemove', _watchMouse);

C.log('unused', PAINT);

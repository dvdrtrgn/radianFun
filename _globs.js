/*global CSS_COLORS, Mover, Runner, Space, Vector, */
const W = window;
const C = W.console;
const AREA = new Space(W.innerWidth, W.innerHeight);
const MOUSE = new Vector(AREA.x, AREA.y);
const _watchMouse = (evt) => MOUSE.read(evt.offsetX, evt.offsetY);

// ---------
// etc
W.addEventListener('mousemove', _watchMouse);

C.log('_globs');

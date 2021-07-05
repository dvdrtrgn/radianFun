import Vector from './lib/vector.js';

let over = false;
let down = false;
let loxy = {};

const followMouse = function (mover) {
  let acc = new Vector(MOUSE).sub(mover.loc);
  mover.vel.limit = acc.mag; // faster for far away
  acc.mag = 7; // obedience
  return acc;
};

const MOUSE = {
  get down() {
    return down;
  },
  get over() {
    return over;
  },
  get x() {
    return loxy.x;
  },
  get y() {
    return loxy.y;
  },
  follow: followMouse,
  toString: () => JSON.stringify(MOUSE),
  valueOf: () => [loxy.x, loxy.y],
};

window.addEventListener('mouseover', () => (over = true));
window.addEventListener('mouseout', () => (over = false));
window.addEventListener('mousedown', () => (down = true));
window.addEventListener('mouseup', () => (down = false));
window.addEventListener('mousemove', (evt) => {
  loxy.x = evt.offsetX;
  loxy.y = evt.offsetY;
});

export default MOUSE;

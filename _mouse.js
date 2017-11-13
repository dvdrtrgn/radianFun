import {W, C} from './_globs.js';
import Vector from './vector.js';

const MOUSE = (function () {
  let over = false;
  let down = false;
  let loxy = {};

  const followMouse = function (mover) {
    let acc = new Vector(I).sub(mover.loc);
    mover.vel.limit = acc.mag; // faster for far away
    acc.mag = 3; // obedience
    return acc;
  };

  const I = {
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
    toString: () => JSON.stringify(I),
    valueOf: () => [loxy.x, loxy.y],
  };

  W.addEventListener('mouseover', () => over = true);
  W.addEventListener('mouseout', () => over = false);
  W.addEventListener('mousedown', () => down = true);
  W.addEventListener('mouseup', () => down = false);
  W.addEventListener('mousemove', (evt) => {
    loxy.x = evt.offsetX;
    loxy.y = evt.offsetY;
  });

  return I;
}());

export default MOUSE;

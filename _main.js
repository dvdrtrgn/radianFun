import {W, C, LOOP, PAINT, Rando} from './_globs.js';
import MOUSE from './_mouse.js';

import Mover from './mover.js';
import Vector from './vector.js';

// ----------------------------

const wind = new Vector(0.5, 0);
const gravity = new Vector(0, 1);
let movers = Array(5).fill(0);

movers = movers.map(function () {
  let name = Rando.color();
  let size = Rando.whole(15) + 5;
  let mass = size / 5;
  let radius = size * 5;
  let m = new Mover(name, mass, radius);

  m.cf.color = name;
  m.addForce(new Vector(Rando.whole(125), 0));

  return m;
}).sort((a, b) => a.mass < b.mass); // move bigger to back

LOOP.init(function () {
  // MOUSE.down && PAINT.clear();
  movers.forEach(function (m) {
    m.addForce(Vector.mult(gravity, m.mass)) // weight
      .addForce(wind)
      .addForce(MOUSE.down ? m.calcDrag() : null)
      .addForce(MOUSE.over && !MOUSE.down ? MOUSE.follow(m) : null)
      // .addForce(Vector.random().div(5)) // excitement
      .update();
  });
});

// ----------------------------
// EXPOSE
Object.assign(W, {W, C, LOOP, MOUSE, Mover, Rando, Vector});

C.log(movers);

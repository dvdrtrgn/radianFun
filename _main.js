import {W, C, LOOP, PAINT, Rando} from './_globs.js';
import MOUSE from './_mouse.js';

import Mover from './mover.js';
import Vector from './vector.js';

// ----------------------------

const wind = new Vector(0.5, 0);
const gravity = new Vector(0, 1);
let movers = Array(2).fill(0);

movers = movers.map(function () {
  let name = Rando.color();
  let mass = Rando.whole(15) + 5;
  let radius = mass * 5;
  let m = new Mover(name, mass, radius);

  m.cf.color = name;
  m.cf.wrap = true;
  m.addForce(Vector.random());

  return m;
}).sort((a, b) => a.mass < b.mass); // move bigger to back

LOOP.init(function () {
  PAINT.clear();
  movers.forEach(function (mover, i) {
    let weight = Vector.mult(gravity, mover.mass);
    let dragF = mover.calcDrag();
    let gravF = mover.calcGrav(i ? movers[0] : movers[1]);
    let drawF = MOUSE.follow(mover);

    mover
      // .addForce(weight)
      // .addForce(wind)
      .addForce(dragF)
      .addForce(gravF)
      // .addForce(MOUSE.over && !MOUSE.down ? drawF : null)
      // .addForce(Vector.random().div(5)) // excitement
      .update();
  });
});

// ----------------------------
// EXPOSE
Object.assign(W, {W, C, LOOP, MOUSE, Mover, Rando, Vector});

C.log(movers);

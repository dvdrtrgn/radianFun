import {W, C, LOOP, PAINT, Rando} from './_globs.js';
import MOUSE from './_mouse.js';

import Mover from './mover.js';
import Vector from './vector.js';

// ----------------------------

function run() {
  // const wind = new Vector(0.05, 0);
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
  });

  // move bigger to back
  movers.sort((a, b) => a.mass < b.mass);

  LOOP.init(function () {
    // PAINT.clear();
    movers.forEach(function (m) {
      m.addForce(Vector.mult(gravity, m.mass)) // weight
        // .addForce(wind)
        // .addForce(MOUSE.follow(m))
        // .addForce(Vector.random().div(5)) // excitement
        .update();
    });
  });
  C.log(movers);
}

run();

// ----------------------------
// EXPOSE

Object.assign(W, {W, C, LOOP, MOUSE, Mover, Rando, Vector});

import { CANVAS, LOOP, MOUSE } from './globs';
import Mover from './Mover';
import Vector from './lib/Vector';

// ---------
// etc

function followMouse(mover) {
  let acc = new Vector(MOUSE.x, MOUSE.y).sub(mover.loc);

  mover.vel.limit = acc.mag; // faster for far away
  acc.mag = 3; // obedience/vigor

  return acc;
}

let male = new Mover('Bad boy', {
  color: 'lightblue',
  mass: 26,
});
let female = new Mover('Good girl', {
  color: 'pink',
  mass: 33,
  allowWrap: false, // bounce
});

function run() {
  LOOP.init(function () {
    CANVAS.clear(); // no trails
    female
      .addForce(new Vector(0, 2)) // weight
      .addForce(followMouse(female))
      .addForce(Vector.random()) // excitement
      .update();
    male
      .addForce(new Vector(0, 1)) // weight
      .addForce(followMouse(male))
      .addForce(Vector.random()) // excitement
      .update();
  });
}

export default { run, male, female };

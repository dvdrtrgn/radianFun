import { CANVAS, LOOP, MOUSE } from './globs';
import Mover from './Mover';
import Vector from './lib/Vector';

const _watchMouse = function (evt) {
  MOUSE.read(evt.offsetX, evt.offsetY);
};

// ---------
// etc
window.addEventListener('mousemove', _watchMouse);

function followMouse(mover) {
  let acc = new Vector(MOUSE.x, MOUSE.y).sub(mover.loc);
  mover.vel.limit = acc.mag; // faster for far away
  acc.mag = 3; // obedience
  return acc;
}

function run() {
  let male = new Mover('Bad boy', 'lightblue', 26);
  let female = new Mover('Good girl', 'pink', 33);
  female.cf.wrap = false;

  LOOP.init(function () {
    CANVAS.clear();
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

export default { run };

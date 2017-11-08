/*global Draw, Mover, Runner, Space, Vector, */
const W = window;
const C = W.console;
const AREA = new Space(W.innerWidth, W.innerHeight);
const LOOP = new Runner();
const MOUSE = new Vector(AREA.x, AREA.y);
const PAINT = new Draw('Test', AREA);
const _watchMouse = function (evt) {
  MOUSE.read(evt.offsetX, evt.offsetY);
};

// ---------
// etc
W.addEventListener('mousemove', _watchMouse);

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
    PAINT.clear();
    female.addForce(new Vector(0, 2)) // weight
      .addForce(followMouse(female))
      .addForce(Vector.random()) // excitement
      .update();
    male.addForce(new Vector(0, 1)) // weight
      .addForce(followMouse(male))
      .addForce(Vector.random()) // excitement
      .update();
  });
}

window.setTimeout(run, 99);

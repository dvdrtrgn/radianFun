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

function forceGen(mover) {
  let acc = new Vector(0, 1);
  if (!mover.stopped()) return acc;
}

function followMouse(mover) {
  let acc = new Vector(MOUSE.x, MOUSE.y).sub(mover.loc);
  if (!mover.stopped()) {
    mover.vel.limit = acc.mag; // faster for far away
    acc.mag = 3; // obedience
    return acc;
  }
}

function run() {
  let mover1 = new Mover('Good girl');
  let mover2 = new Mover('Bad boy');

  LOOP.init(function () {
    let acc1 = forceGen(mover1);
    let acc2 = forceGen(mover2);
    if (!acc1 || !acc2) return;

    acc1.add(followMouse(mover1));
    acc1.add(Vector.random()); // excitement
    mover1.contain().update(acc1);

    acc2.add(followMouse(mover2));
    acc2.add(Vector.random()); // excitement
    mover2.wrap().update(acc2);
  });
}

window.setTimeout(run, 99);

/*global Mover, Runner, Space, Vector, */
const W = window;
const C = W.console;
const SPC = new Space(W.innerWidth, W.innerHeight);
const MOU = new Vector(SPC.x, SPC.y);
const RNR = new Runner();
const _watchMouse = function (evt) {
  MOU.read(evt.offsetX, evt.offsetY);
};

// ---------
// etc
W.addEventListener('mousemove', _watchMouse);

function forceGen(mover) {
  let acc = new Vector(0, 1);
  if (!mover.stopped()) return acc;
}

function followMouse(mover) {
  let acc = new Vector(MOU.x, MOU.y).sub(mover.loc);
  if (!mover.stopped()) {
    mover.vel.limit = acc.mag; // faster for far away
    acc.mag = 3; // obedience
    return acc;
  }
}

function mover() {
  let mover = new Mover();

  RNR.init(function () {
    let acc = forceGen(mover);
    if (!acc) return;

    acc.add(followMouse(mover));
    acc.add(Vector.random()); // excitement
    mover.contain().update(acc);
  });
}

window.setTimeout(mover, 99);

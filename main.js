/*global Draw, Runner, Space, Vector, */
const W = window;
const C = W.console;
const SPC = new Space(W.innerWidth, W.innerHeight);
const DRW = new Draw('Test', SPC);
const RNR = new Runner();
const MOU = new Vector(SPC.x, SPC.y);
const _watchMouse = function (evt) {
  MOU.read(evt.offsetX, evt.offsetY);
};

// ---------
// etc
let dead = 0;
W.addEventListener('mousemove', _watchMouse);

function contain(loc, vel) {
  let x = loc.x;
  let y = loc.y;
  if (x < 0 || x > SPC.w) {
    loc.x = x < 0 ? 0 : SPC.w;
    vel.x *= -0.99;
  }
  if (y < 0 || y > SPC.h) {
    loc.y = y < 0 ? 0 : SPC.h;
    vel.y *= -0.99;
  }
}

function stopped(vel) {
  let rate = (vel.mag | 0);
  if (rate > 1) return;
  if (rate !== dead) {
    if (rate) C.log('stopped');
    dead = rate;
    return true;
  }
}

function followMouse(loc, vel) {
  let acc = new Vector(MOU.x, MOU.y).sub(loc);
  if (!stopped(vel)) {
    vel.limit = acc.mag; // faster for far away
    acc.mag = 3; // obedience
    acc.add(Vector.random()); // excitement
    return acc;
  }
}

function drop(loc, vel) {
  let acc = new Vector(1, 2);
  if (!stopped(vel)) return acc;
}

function mover() {
  let loc = new Vector(SPC.x, SPC.y);
  let vel = new Vector();
  let force = drop || followMouse;

  RNR.init(function () {
    let acc = force(loc, vel);
    if (!acc) return;

    // UPDATE
    vel.add(acc);
    loc.add(vel);

    // DISPLAY
    contain(loc, vel);
    DRW.fade().circle(loc.x, loc.y, 33);
  });
}

mover();

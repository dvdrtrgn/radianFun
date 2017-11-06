/*global Draw, Runner, Space, Vector, */
const W = window;
const C = W.console;
const SPC = new Space(W.innerWidth, W.innerHeight);
const DRW = new Draw('Test', SPC);
const RNR = new Runner();
const MOU = new Vector(SPC.w / 2, SPC.h / 2);
W.addEventListener('mousemove', function (evt) {
  MOU.read(evt.offsetX, evt.offsetY);
});
let dead = 0;

function stopped(acc, vel) {
  if (acc.mag < 1) {
    let rate = (vel.mag | 0);
    if (dead !== rate) {
      if (rate) C.log('caught @', rate);
      dead = rate;
      return true;
    }
  }
}

function followMouse(loc, vel) {
  let acc = new Vector(MOU.x, MOU.y).sub(loc);
  if (!stopped(acc, vel)) {
    vel.limit = acc.mag; // faster for far away
    acc.mag = 3; // obedience
    acc.add(Vector.random()); // excitement
    return acc;
  }
}

function contain(loc, vel) {
  if (loc.x < 0 || loc.x > SPC.w) {
    vel.x *= -1;
  } else
  if (loc.y < 0 || loc.y > SPC.w) {
    vel.y *= -1;
  }
}

function mover() {
  let loc = new Vector(SPC.w / 2, SPC.h / 2);
  let vel = new Vector();

  RNR.init(function () {
    let acc = followMouse(loc, vel);
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

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

function test1() {
  let loc = new Vector(SPC.w / 2, SPC.h / 2);
  let vel = new Vector();
  let halt = 0;

  RNR.init(function () { // update
    let acc = new Vector(MOU.x, MOU.y).sub(loc);

    if (acc.mag < 1) {
      let last = vel.mag | 0;
      if (halt !== last) C.log('caught @', halt) || (halt = last);
      else return;
    }

    vel.limit = acc.mag; // faster for far away
    acc.mag = 3; // obedience
    acc.add(Vector.random()); // excitement

    DRW.fade().circle(loc.x, loc.y, 33);
    vel.add(acc);
    loc.add(vel);
  });
}

test1();

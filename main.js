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
  vel.limit = 11;

  RNR.init(function () { // update
    let acc = new Vector(MOU.x, MOU.y);
    acc.sub(loc).add(Vector.random()).norm();

    DRW.fade().circle(loc.x, loc.y, 33);
    vel.add(acc);
    loc.add(vel);
  });
}

test1();

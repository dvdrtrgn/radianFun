/*global Draw, Runner, Space, Vector, */
const W = window;
const C = W.console;
const SPC = new Space(W.innerWidth, W.innerHeight);
const DRW = new Draw('Test', SPC);
const RNR = new Runner();

function test1() {
  let pnt = new Vector();
  let Cf = {
    radius: 10,
    bounce: 30,
    vscale: 20,
    offset: 100,
    scan: function () {
      return SPC.indexPosition(RNR.time.elapsed, true);
    },
  };

  RNR.init(function () { // draw
    let time = RNR.time.elapsed;
    let scan = Cf.scan();
    let size = Cf.radius + scan.y; // grow

    pnt.read(scan);
    pnt.y = Cf.vscale * pnt.y + Cf.offset;
    pnt.offset(Cf.bounce, time);

    DRW.fade(); // do not clear
    DRW.circle(pnt.x, pnt.y, size);
  });
}

test1();

/*global Draw, Runner, Space, Vector, */
const W = window;
const C = W.console;
const SPC = new Space(W.innerWidth, W.innerHeight);
const DRW = new Draw('Test', SPC);
const RNR = new Runner();

function test1() {
  let Cf = {
    bounce: 30,
    vscale: 20,
  };
  let loc = new Vector();

  RNR.init(function () { // update
    let time = RNR.time.elapsed;
    let scan = SPC.indexPosition(time, true);
    let size = scan.y + 5; // grow

    loc.read(scan);
    loc.y = Cf.vscale * size;
    loc.offset(Cf.bounce, time);
    // do not clear
    DRW.fade().circle(loc.x, loc.y, size);
  });
}

test1();

/*global Draw, Runner, Space, Vector, */
const W = window;
const C = W.console;
const SPC = new Space(W.innerWidth, W.innerHeight);
const DRW = new Draw('Test', SPC);
const RNR = new Runner();

function test1() {
  let loc = new Vector();

  RNR.init(function () { // update
  });
}

test1();

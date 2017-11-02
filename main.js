/*global Angle, Draw, Point, Runner, Space, */
var W = window;
var C = W.console;
let R;

function test1() {
  R = new Runner();
  let ang = new Angle();
  let pnt = new Point();
  let spc = new Space(W.innerWidth, W.innerHeight);
  let drw = new Draw('Test', spc);
  let Cf = {
    radius: 10,
    bounce: 30,
    vscale: 20,
    offset: 100,
    scan: function () {
      return spc.indexPosition(R.time.elapsed, true);
    },
  };

  R.init(function () { // draw
    let time = R.time.elapsed;
    let scan = Cf.scan();
    let size = Cf.radius + scan.y; // grow

    ang.deg = time;
    pnt.read(scan);
    pnt.y = Cf.vscale * pnt.y + Cf.offset;
    pnt.translate(Cf.bounce, ang);

    drw.fade(); // do not clear
    drw.circle(pnt.x, pnt.y, size);
  });
}

test1();

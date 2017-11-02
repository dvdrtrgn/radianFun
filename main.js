/*global Angle, Draw, Point, Runner, Space, */
var W = window;
var C = W.console;
let R;

function test1() {
  R = new Runner();
  let arc = new Angle();
  let pos = new Point();
  let grid = new Space(W.innerWidth, W.innerHeight);
  let draw = new Draw('Test', grid);
  let Cf = {
    radius: 10,
    bounce: 30,
    vscale: 20,
    offset: 100,
    scan: function () {
      return grid.indexPosition(R.time.elapsed, true);
    },
  };

  R.init(function () { // draw
    let time = R.time.elapsed;
    let scan = Cf.scan();
    let size = Cf.radius + scan.y; // grow

    arc.deg = time;
    pos.read(scan);
    pos.y *= Cf.vscale;
    pos.y += Cf.offset;
    pos.translate(Cf.bounce, arc);

    draw.fade(); // do not clear
    draw.circle(pos.x, pos.y, size);
  });
}

test1();

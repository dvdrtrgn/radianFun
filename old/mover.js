/*global Vector, */
const Mover = (function () {

  // ----------------------------
  function MVR(grid) {
    if (!grid) return;
    let loc = new Vector(grid.w / 2, grid.h / 2);
    let vel = new Vector(1, 3);

    Object.assign(this, {
      update: function () {
        loc.add(vel);
      },
      edges: function () {
        if (loc.x > grid.w) loc.x = 0;
        if (loc.x < 0) loc.x = grid.w;
        if (loc.y > grid.h) loc.y = 0;
        if (loc.y < 0) loc.y = grid.h;
      },
      loc,
      vel,
    });
  }

  return MVR;
}());

new Mover;

/*

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

 */

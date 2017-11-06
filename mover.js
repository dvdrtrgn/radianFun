/*global Vector, Draw, SPC, MOU, */
const Mover = (function () {
  const W = window;
  const C = W.console;
  const DRW = new Draw('Test', SPC);

  function contain(loc, vel) {
    let x = loc.x;
    let y = loc.y;
    if (x < 0 || x > SPC.w) {
      loc.x = x < 0 ? 0 : SPC.w;
      vel.x *= -0.9;
    }
    if (y < 0 || y > SPC.h) {
      loc.y = y < 0 ? 0 : SPC.h;
      vel.y *= -0.9;
    }
  }

  function display(loc) {
    DRW.fade().circle(loc.x, loc.y, 33);
  }

  function wrap(loc) {
    if (loc.x > SPC.w) loc.x = 0;
    if (loc.x < 0) loc.x = SPC.w;
    if (loc.y > SPC.h) loc.y = 0;
    if (loc.y < 0) loc.y = SPC.h;
  }

  // ----------------------------
  function MVR() {
    const I = this;
    let loc = new Vector(SPC.x, SPC.y);
    let vel = new Vector();
    let dead = 0;

    Object.assign(I, {
      update: function (acc) {
        vel.add(acc);
        loc.add(vel);
        display(loc);
      },
      contain: function () {
        contain(loc, vel);
        return I;
      },
      stopped: function () {
        let rate = (vel.mag | 0);
        if (rate > 1) return;
        if (rate !== dead) {
          if (rate) C.log('stopped');
          dead = rate;
          return true;
        }
      },
      wrap: function () {
        wrap(loc);
        return I;
      },
      loc,
      vel,
    });
  }

  return MVR;
}());

new Mover;

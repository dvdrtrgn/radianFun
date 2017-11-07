/*global AREA, PAINT, Vector, */
const Mover = (function () {
  const W = window;
  const C = W.console;

  function contain(loc, vel) {
    let x = loc.x;
    let y = loc.y;
    if (x < 0 || x > AREA.w) {
      loc.x = x < 0 ? 0 : AREA.w;
      vel.x *= -0.9;
    }
    if (y < 0 || y > AREA.h) {
      loc.y = y < 0 ? 0 : AREA.h;
      vel.y *= -0.9;
    }
  }

  function display(loc, cf) {
    PAINT.circle(loc.x, loc.y, cf.size, cf.color);
  }

  function wrap(loc) {
    if (loc.x > AREA.w) loc.x = 0;
    if (loc.x < 0) loc.x = AREA.w;
    if (loc.y > AREA.h) loc.y = 0;
    if (loc.y < 0) loc.y = AREA.h;
  }

  // ----------------------------
  function MVR(nom, col, siz) {
    const I = this;
    let loc = new Vector(AREA.x, AREA.y);
    let vel = new Vector();
    let dead = 0;
    let cf = {
      name: nom,
      color: col || 'black',
      dead: 0,
      size: siz || 10,
      wrap: true,
    };

    Object.assign(I, {
      update: function (acc) {
        vel.add(acc);
        loc.add(vel);
        display(loc, cf);
      },
      contain: function () {
        contain(loc, vel);
        return I;
      },
      stopped: function () {
        let rate = (vel.mag | 0);
        if (rate > 1) return;
        if (rate !== dead) {
          if (nom && !rate) C.log('stopped', nom);
          dead = rate;
          return true;
        }
      },
      wrap: function () {
        wrap(loc);
        return I;
      },
      cf,
      loc,
      vel,
      nom,
    });
  }

  return MVR;
}());

new Mover;

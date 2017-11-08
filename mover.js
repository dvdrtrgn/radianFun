/*global AREA, PAINT, Vector, */
const Mover = (function () {
  const W = window;
  const C = W.console;

  function contain(loc, vel) {
    let x = loc.x;
    let y = loc.y;
    if (x < 0 || x > AREA.w) {
      loc.x = x < 0 ? 0 : AREA.w;
      vel.x *= -0.5;
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

  function stopped(vel, cf) {
    let rate = (vel.mag | 0);
    if (rate > 1) return;
    if (rate !== cf.dead) {
      if (cf.name && !rate) C.log('stopped', cf.name);
      cf.dead = rate;
      return true;
    }
  }

  // ----------------------------
  function MVR(name, mass = 1, size = 10) {
    const I = this;
    let acc = new Vector();
    let loc = new Vector(AREA.x, AREA.y);
    let vel = new Vector();
    let cf = {
      color: 'black',
      dead: 0,
      wrap: false,
      name,
      mass,
      size,
    };

    Object.assign(I, {
      addForce: function (force) {
        if (force) acc.add(Vector.div(force, I.mass));
        return I;
      },
      update: function () {
        vel.add(acc);
        loc.add(vel);
        cf.wrap ? wrap(loc) : contain(loc, vel);
        acc.mag = 0;
        display(loc, cf);
      },
      stopped: function () {
        return stopped(vel, cf);
      },
      cf,
      loc,
      vel,
      name,
      mass,
    });
  }

  return MVR;
}());

new Mover;

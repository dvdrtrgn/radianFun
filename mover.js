import {W, C, AREA, PAINT} from './_globs.js';
import Vector from './vector.js';

const constrain = (v, l, h) => v < l ? l : (v > h ? h : v);
const random = (v) => Math.random() * v;
let GC = 1;

function contain(loc, vel) {
  let x = loc.x;
  let y = loc.y;
  if (x < 0 || x > AREA.w) {
    loc.x = x < 0 ? 0 : AREA.w;
    vel.x *= -1;
  }
  if (y < 0 || y > AREA.h) {
    loc.y = y < 0 ? 0 : AREA.h;
    vel.y *= -1;
  }
}

function display(loc, cf) {
  PAINT.ctx.globalAlpha = 0.1;
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

function calcDrag(vel, Phi, sA, dC) {
  // Fd = -(1/2) * Phi * v2 * sA * dC * vN
  Phi = Phi || 1; // density
  sA = sA || 1; // surface area
  dC = dC || 0.001; // drag coefficient

  let consts = -0.5 * Phi * sA * dC;
  let v2 = Math.pow(vel.mag, 2);
  let vN = vel.get().norm();

  return vN.mult(consts * v2);
}

function calcGrav(m1, m2, gC) {
  // Fg = (gC * m1m * m2m / dir.mag^2) * dir.norm
  gC = gC || GC; // gravitational constant

  let dir = Vector.sub(m2.loc, m1.loc); // diff:distance
  let d2 = Math.pow(dir.mag, 2); // distance squared

  d2 = constrain(d2, 10, 500); // keep sanity

  return dir.norm().mult(gC * m1.mass * m2.mass / d2);
}

// ----------------------------
// CSTR

function Mover(name, mass = 1, size = 10) {
  const I = this;
  let acc = new Vector();
  let loc = new Vector(random(AREA.w), random(AREA.h));
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
      acc.mult(0);
      display(loc, cf);
    },
    stopped: function () {
      return stopped(vel, cf);
    },
    calcDrag: function () {
      return calcDrag(vel);
    },
    calcGrav: function (i2) {
      return calcGrav(I, i2);
    },
    cf,
    loc,
    vel,
    name,
    mass,
  });
}

export default Mover;

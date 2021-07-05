/*
  Model a physical object
  Provide vectors for velocity, location, acceleration
*/
import Vector from './lib/Vector';
import { BOUNDS, CANVAS } from './globs';

function contain(loc, vel) {
  let x = loc.x;
  let y = loc.y;
  if (x < 0 || x > BOUNDS.w) {
    loc.x = x < 0 ? 0 : BOUNDS.w;
    vel.x *= -0.9;
  }
  if (y < 0 || y > BOUNDS.h) {
    loc.y = y < 0 ? 0 : BOUNDS.h;
    vel.y *= -0.9;
  }
}

function display(loc, cf) {
  CANVAS.circle(loc.x, loc.y, cf.mass, cf.color);
}

function wrapAround(loc) {
  if (loc.x > BOUNDS.w) loc.x = 0;
  if (loc.x < 0) loc.x = BOUNDS.w;
  if (loc.y > BOUNDS.h) loc.y = 0;
  if (loc.y < 0) loc.y = BOUNDS.h;
}

function stopped(vel, cf) {
  let rate = vel.mag | 0;
  if (rate > 1) return;

  if (rate !== cf.dead) {
    if (cf.name && !rate) console.log('stopped', cf.name);
    cf.dead = rate;
    return true;
  }
}

// ----------------------------
function Mover(nom, obj) {
  const self = this;
  let acc = new Vector();
  let loc = new Vector(BOUNDS.x, BOUNDS.y);
  let vel = new Vector();

  let cf = Object.assign(
    {
      name: nom,
      color: 'black',
      dead: 0,
      mass: 10,
      allowWrap: true,
    },
    obj,
  );

  Object.assign(self, {
    addForce: function (force) {
      acc.add(force);
      return self;
    },
    update: function () {
      vel.add(acc);
      loc.add(vel);
      cf.allowWrap ? wrapAround(loc) : contain(loc, vel);
      acc.mag = 0;
      display(loc, cf);
    },
    stopped: function () {
      return stopped(vel, cf);
    },
    cf,
    acc,
    loc,
    vel,
  });
}

export default Mover;

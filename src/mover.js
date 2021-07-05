import Vector from './lib/Vector';
import { SPACE, CANVAS } from './globs';

function contain(loc, vel) {
  let x = loc.x;
  let y = loc.y;
  if (x < 0 || x > SPACE.w) {
    loc.x = x < 0 ? 0 : SPACE.w;
    vel.x *= -0.9;
  }
  if (y < 0 || y > SPACE.h) {
    loc.y = y < 0 ? 0 : SPACE.h;
    vel.y *= -0.9;
  }
}

function display(loc, cf) {
  CANVAS.circle(loc.x, loc.y, cf.size, cf.color);
}

function wrap(loc) {
  if (loc.x > SPACE.w) loc.x = 0;
  if (loc.x < 0) loc.x = SPACE.w;
  if (loc.y > SPACE.h) loc.y = 0;
  if (loc.y < 0) loc.y = SPACE.h;
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
function Mover(nom, col, siz) {
  const self = this;
  let acc = new Vector();
  let loc = new Vector(SPACE.x, SPACE.y);
  let vel = new Vector();
  let cf = {
    name: nom,
    color: col || 'black',
    dead: 0,
    size: siz || 10,
    wrap: true,
  };

  Object.assign(self, {
    addForce: function (force) {
      acc.add(force);
      return self;
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
    nom,
  });
}

export default Mover;

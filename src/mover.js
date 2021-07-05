import Vector from './lib/Vector';
import Space from './lib/Space';
import Draw from './lib/Draw';

export const AREA = new Space(window.innerWidth, window.innerHeight);
export const PAINT = new Draw('Test', AREA);

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
  let loc = new Vector(AREA.x, AREA.y);
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
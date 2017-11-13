import {W, C} from './_globs.js';
/*
?   deg     // angle in degrees
?   rad     // angle in radians
*/
const MIN = 1e-66;
const isvoid = (n) => typeof n === 'undefined';
const isdef = (n) => !isvoid(n);
const forcenum = (n, m) => Number(n) || m || 0;
const hypot = (x, y) => (x || y) ? Math.sqrt(x * x + y * y) : MIN;
const simp = (n, m) => parseFloat(n.toFixed(m || 7));
const rando = (mag = 1) => mag * (Math.random() * 2 - 1);
const deg2rad = (deg) => deg * Math.PI / 180.0;
// const rad2deg = (rad) => rad / Math.PI * 180.0;

// ----------------------------
// HELP

function parse(x, y, obj) {
  if (typeof x === 'object') {
    if (x.length === 2)
      y = x[1], x = x[0];
    else if (isdef(x.y))
      y = x.y, x = x.x;
  }
  obj.x = x, obj.y = y;
  return obj;
}

function vector(dist, deg, obj) {
  let rad = deg2rad(forcenum(deg));
  obj.x += Math.cos(rad) * dist;
  obj.y += Math.sin(rad) * dist;
  return obj;
}

function add(vect, obj) {
  obj.x += vect.x, obj.y += vect.y;
  return obj;
}

function sub(vect, obj) {
  obj.x -= vect.x, obj.y -= vect.y;
  return obj;
}

function mult(num, obj) {
  obj.mag *= num;
  return obj;
}

function div(num, obj) {
  obj.mag /= num;
  return obj;
}

// ----------------------------
// CSTR
function Vector(X, Y) {
  let I = this;
  let val = {
    lm: undefined,
    mg: 0,
    x: 0,
    y: 0,
  };

  function adjust(dmag) {
    if (dmag) {
      val.x /= dmag;
      val.y /= dmag;
      val.mg /= dmag;
    } else {
      val.mg = hypot(val.x, val.y);
    }
    if (val.mg > val.lm) {
      I.mag = val.lm;
    }
  }

  Object.defineProperties(I, {
    limit: {
      get: () => val.lm,
      set: (num) => {
        val.lm = forcenum(num, MIN);
        adjust();
      },
    },
    x: {
      get: () => val.x,
      set: (num) => {
        val.x = forcenum(num);
        adjust(); // or wait for the y shoe to drop
      },
    },
    y: {
      get: () => val.y,
      set: (num) => {
        val.y = forcenum(num);
        adjust();
      },
    },
    mag: {
      get: () => val.mg,
      set: (num) => {
        adjust(val.mg / forcenum(num, MIN));
      },
    },
    dump: {
      get: () => val,
    },
  });
  parse(X, Y, I);
}

// ----------------------------
// METH
Object.assign(Vector.prototype, {
  valueOf: function () {
    return [this.x, this.y];
  },
  toString: function () {
    return `Vector: ${simp(this.x)} / ${simp(this.y)} | ${simp(this.mag)}`;
  },
  read: function (x, y) {
    return parse(x, y, this);
  },
  offset: function (dist, deg) {
    return vector(dist, deg, this);
  },
  add: function (vect) {
    return add(vect, this);
  },
  sub: function (vect) {
    return sub(vect, this);
  },
  mult: function (vect) {
    return mult(vect, this);
  },
  div: function (vect) {
    return div(vect, this);
  },
  norm: function () {
    this.mag = 1;
    return this;
  },
  get: function () {
    return new Vector(this);
  },
});

// ----------------------------
// STATIC
Vector.random = function () {
  let tmp = new Vector(rando(), rando());
  return tmp.norm();
};
Vector.read = function (x, y) {
  return parse(x, y, new Vector);
};
Vector.offset = function (dist, deg) {
  return vector(dist, deg, new Vector);
};
Vector.add = function (v1, v2) {
  return add(v2, new Vector(v1));
};
Vector.sub = function (v1, v2) {
  return sub(v2, new Vector(v1));
};
Vector.mult = function (vect, num) {
  return mult(num, new Vector(vect));
};
Vector.div = function (vect, num) {
  return div(num, new Vector(vect));
};

export default Vector;

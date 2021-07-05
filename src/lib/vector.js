/*
  Model a math vector
  Provide mutations
  Provide geometric props
*/
const MIN = 1e-33;
const isnil = (n) => typeof n === 'undefined';
const isval = (n) => !isnil(n);
const forcenum = (n, m) => Number(n) || m || 0;
const hypot = (x, y) => (x || y ? Math.sqrt(x * x + y * y) : MIN);
const simp = (n, m) => parseFloat(n.toFixed(m || 7));
const rando = (mag = 1) => mag * (Math.random() * 2 - 1);
// const deg2rad = (deg) => (deg * Math.PI) / 180.0;
// const rad2deg = (rad) => rad / Math.PI * 180.0;

// ----------------------------
// HELP

function parse(x, y, obj) {
  if (typeof x === 'object') {
    if (x.length === 2) (y = x[1]), (x = x[0]);
    else if (isval(x.y)) (y = x.y), (x = x.x);
  }
  (obj.x = x), (obj.y = y);
  return obj;
}

// function revector(dist, deg, obj) {
//   let rad = deg2rad(forcenum(deg));
//   obj.x += Math.cos(rad) * dist;
//   obj.y += Math.sin(rad) * dist;
//   return obj;
// }

// ----------------------------
// CTOR
function Vector(X, Y) {
  const self = this;
  let _L = undefined; // limit
  let _M = 0; // magnitude
  let _X = 0;
  let _Y = 0;

  function adjust(deltaMag) {
    if (deltaMag) {
      _X /= deltaMag;
      _Y /= deltaMag;
      _M /= deltaMag;
    } else {
      _M = hypot(_X, _Y);
    }
    if (_M > _L) {
      self.mag = _L;
    }
  }

  Object.defineProperties(self, {
    limit: {
      get: () => _L,
      set: (num) => {
        _L = forcenum(num, MIN);
        adjust();
      },
    },
    x: {
      get: () => _X,
      set: (num) => {
        _X = forcenum(num);
        // adjust(); // or wait for the y shoe to drop
      },
    },
    y: {
      get: () => _Y,
      set: (num) => {
        _Y = forcenum(num);
        adjust();
      },
    },
    mag: {
      get: () => _M,
      set: (num) => {
        adjust(_M / forcenum(num, MIN));
      },
    },
    dump: {
      get: () => ({ _X, _Y, _M, _L }),
    },
  });
  parse(X, Y, self);
}

// ----------------------------
// METHODS
Object.assign(Vector.prototype, {
  valueOf: function () {
    return [this.x, this.y];
  },
  toString: function () {
    return `Vector: ${simp(this.x)} / ${simp(this.y)} | ${simp(this.mag)}`;
  },
  input: function (x, y) {
    return parse(x, y, this);
  },
  // offset: function (dist, deg) {
  //   return revector(dist, deg, this);
  // },
  add: function (vect) {
    (this.x += vect.x), (this.y += vect.y);
    return this;
  },
  sub: function (vect) {
    (this.x -= vect.x), (this.y -= vect.y);
    return this;
  },
  norm: function () {
    this.mag = 1;
    return this;
  },
});

// ----------------------------
// STATIC
Vector.random = function () {
  var tmp = new Vector(rando(), rando());
  return tmp.norm();
};
// Vector.read = function (x, y) {
//   return parse(x, y, new Vector());
// };
// Vector.offset = function (dist, deg) {
//   return revector(dist, deg, new Vector());
// };

export default Vector;

const Vector = (function () {
  /*
?   deg     // angle in degrees
?   rad     // angle in radians
?   mult()  // scale up x and y
?   div()   // scale down x and y
  */
  const C = window.console;
  const isvoid = (n) => typeof n === 'undefined';
  const isdef = (n) => !isvoid(n);
  const forcenum = (n, m) => Number(n) || m || 0;
  const hypot = (x, y) => (x || y) ? danger(Math.sqrt(x * x + y * y)) : 0;
  const simp = (n, m) => parseFloat(n.toFixed(m || 7));
  const rando = (mag = 1) => mag * (Math.random() * 2 - 1);
  const deg2rad = (deg) => deg * Math.PI / 180.0;
  // const rad2deg = (rad) => rad / Math.PI * 180.0;

  // ----------------------------
  // HELP
  function danger(n) {
    if (Math.abs(n) < 1e-17) C.warn(n, 'is too small');
    return n;
  }

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

  // ----------------------------
  // CSTR
  function VEC(X, Y) {
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
          val.lm = forcenum(num, 1e-9);
          adjust();
        },
      },
      x: {
        get: () => val.x,
        set: (num) => {
          val.x = forcenum(num);
          // adjust(); // or wait for the y shoe to drop
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
          adjust(val.mg / forcenum(num, 1e-9));
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
  Object.assign(VEC.prototype, {
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
      this.x += vect.x, this.y += vect.y;
      return this;
    },
    sub: function (vect) {
      this.x -= vect.x, this.y -= vect.y;
      return this;
    },
    norm: function () {
      this.mag = 1;
      return this;
    },
  });

  // ----------------------------
  // STATIC
  VEC.random = function () {
    var tmp = new VEC(rando(), rando());
    return tmp.norm();
  };
  VEC.read = function (x, y) {
    return parse(x, y, new VEC);
  };
  VEC.offset = function (dist, deg) {
    return vector(dist, deg, new VEC);
  };

  return VEC;
}());

new Vector;

const Vector = (function () {
  /*
    x       // size x
    y       // size y
    mag     // get hypotenuse size
?   deg     // angle in degrees
?   rad     // angle in radians
    norm()  // divide all by hypot
    add()   // add x and y
    sub()   // subtract x and y
?   mult()  // scale up x and y
?   div()   // scale down x and y
  */
  const isvoid = (n) => typeof n === 'undefined';
  const isdef = (n) => !isvoid(n);
  const forcenum = (n, m) => Number(n) || m || 0;
  const hypot = (x, y) => danger(Math.sqrt(x * x + y * y));
  const simp = (n, m) => parseFloat(n.toFixed(m || 7));
  const C = window.console;

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

  function vector(dist, ang, obj) {
    let rad = ang && ang.rad ? ang.rad : forcenum(ang);
    obj.x += Math.cos(rad) * dist;
    obj.y += Math.sin(rad) * dist;
    return obj;
  }

  // ----------------------------
  // CSTR
  function VEC(X, Y) {
    let I = this;
    let val = {
      x: 0,
      y: 0,
      get mag() {
        return I.mag;
      },
    };
    Object.defineProperties(I, {
      x: {
        get: () => val.x,
        set: (x) => val.x = forcenum(x),
      },
      y: {
        get: () => val.y,
        set: (y) => val.y = forcenum(y),
      },
      mag: {
        get: () => hypot(I.x, I.y),
        set: (m) => {
          let mag = I.mag / forcenum(m, 1e-9);
          I.x /= mag, I.y /= mag;
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
    offset: function (dist, ang) {
      return vector(dist, ang, this);
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
  VEC.read = function (x, y) {
    return parse(x, y, new VEC);
  };
  VEC.offset = function (dist, ang) {
    return vector(dist, ang, new VEC);
  };

  return VEC;
}());

new Vector;

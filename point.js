const Point = (function () {
  const isBlank = (x) => typeof x === 'undefined';
  const isDefined = (x) => !isBlank(x);
  const forceNumber = (x) => Number(x) || 0;

  function translate(obj, dist, ang) {
    let rad = ang && ang.rad ? ang.rad : 0;
    obj.x += Math.cos(rad) * dist;
    obj.y += Math.sin(rad) * dist;
    return obj;
  }

  // ----------------------------
  function PNT(X, Y) {
    let val = {
      x: 0,
      y: 0,
    };
    Object.defineProperties(this, {
      x: {
        get: () => val.x,
        set: (x) => val.x = forceNumber(x),
      },
      y: {
        get: () => val.y,
        set: (y) => val.y = forceNumber(y),
      },
      valueOf: {
        value: () => [this.x, this.y],
      },
      toString: {
        value: () => `Point: ${this.x} / ${this.y}`,
      },
      read: {
        value: function (x, y) {
          if (typeof x === 'object') {
            if (x.length === 2) {
              y = x[1], x = x[0];
            } else if (isDefined(x.y)) {
              y = x.y, x = x.x;
            }
          }
          this.x = x;
          this.y = y;
        },
      },
      translate: {
        value: function (dist, ang) {
          return translate(this, dist, ang);
        },
      },
    });
    this.read(X, Y);
  }
  PNT.translate = function (dist, ang) {
    return translate(new PNT, dist, ang);
  };

  return PNT;
}());

new Point;

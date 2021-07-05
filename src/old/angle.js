const Angle = (function () {
  const isBlank = (x) => typeof x === 'undefined';
  const isDefined = (x) => !isBlank(x);
  const forceNumber = (x) => Number(x) || 0;
  const rad2deg = (rad) => (rad / Math.PI) * 180.0;
  const deg2rad = (deg) => (deg * Math.PI) / 180.0;

  // ----------------------------
  function ANG(deg) {
    let val = forceNumber(deg);
    Object.defineProperties(this, {
      deg: {
        get: () => val,
        set: (deg) => {
          if (isDefined(deg)) val = forceNumber(deg);
        },
      },
      rad: {
        get: () => deg2rad(val),
        set: (rad) => {
          if (isDefined(rad)) val = rad2deg(forceNumber(rad));
        },
      },
      normalize: {
        value: () => (val = val % 360),
      },
      toString: {
        value: () => `Angle: ${this.deg} deg / ${this.rad} rad`,
      },
    });
  }
  // translate units
  ANG.rad2deg = rad2deg;
  ANG.deg2rad = deg2rad;

  return ANG;
})();

new Angle();

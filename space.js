const Space = (function () {
  const forceNumber = (x) => Number(x) || 0;

  // ----------------------------
  function SPC(W, H) {
    if (typeof W === 'object') {
      if (W.length === 2) {
        H = W[1], W = W[0];
      } else {
        H = W.h, W = W.w;
      }
    }
    let val = {
      w: forceNumber(W),
      h: forceNumber(H),
    };
    Object.defineProperties(this, {
      w: {
        get: () => val.w,
        set: (w) => val.w = forceNumber(w),
      },
      h: {
        get: () => val.h,
        set: (h) => val.h = forceNumber(h),
      },
      valueOf: {
        value: () => [this.w, this.h],
      },
      toString: {
        value: () => `Space: ${this.w} / ${this.h}`,
      },
      // get coordinates from set of all positions
      indexPosition: {
        value: function (i, alt) {
          i = i % (this.w * this.h);
          let x = i % this.w;
          let y = (i / this.w) | 0;
          let rev = (alt && y % 2);
          return {
            x: rev ? this.w - x : x,
            y: y,
          };
        },
      },
    });
  }

  return SPC;
}());

new Space;

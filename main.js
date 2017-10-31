/*global UTIL, Angle, Space, */
var W = window;
var C = W.console;
var U = UTIL;
var A = {
  arc: new Angle(),
  grid: new Space(),
  circ: function (r, x, y) {
    U.drawCircle.call(A.ctx, x, y, r);
  },
  clear: function () {
    U.clearCanvas.call(A.ctx);
  },
  scan: function () {
    return A.grid.indexPosition(U.runTime(), true);
  },
  init: function (loop) {
    A.can = document.getElementById('Test');
    A.ctx = A.can.getContext('2d');
    A.grid = new Space(W.innerWidth, W.innerHeight);
    A.can.width = A.grid.w, A.can.height = A.grid.h;
    W.addEventListener('click', function () {
      W[loop] = function () {};
    });
    C.log(A, loop && W[loop]());
  },
};

function swing(pos, amount) {
  var rad = A.arc.rad;
  return {
    x: pos.x + Math.cos(rad) * amount,
    y: pos.y + Math.sin(rad) * amount,
  };
}

function _loop() {
  var pos = A.scan();
  pos.y *= 10;
  A.arc.deg = U.runTime();
  pos = swing(pos, 100);
  // A.clear();
  A.circ(8, pos.x, pos.y);
  return requestAnimationFrame(_loop);
}

(function () {
  A.init('_loop', _loop);
}());

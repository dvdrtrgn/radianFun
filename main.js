/*global UTIL, Angle, Point, Space, */
var W = window;
var C = W.console;
var U = UTIL;
var A = {
  arc: new Angle(),
  grid: new Space(),
  pos: new Point(),
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

function _loop() {
  A.arc.deg = U.runTime();
  A.pos.read(A.scan());
  A.pos.y *= 10;
  A.pos.translate(100, A.arc);
  A.circ(8, A.pos.x, A.pos.y);
  return requestAnimationFrame(_loop);
}

(function () {
  A.init('_loop', _loop);
}());

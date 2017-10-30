/*global UTIL, */
var W = window;
var C = W.console;
var U = UTIL;
var A = {
  circ: function (r, x, y) {
    U.drawCircle.call(A.ctx, x, y, r);
  },
  clear: function () {
    U.clearCanvas.call(A.ctx);
  },
  scan: function () {
    return U.indexPosition.call(A, U.runTime(), true);
  },
  init: function (loop) {
    A.can = document.getElementById('Test');
    A.ctx = A.can.getContext('2d');
    A.width = A.can.width = W.innerWidth;
    A.height = A.can.height = W.innerHeight;
    W.addEventListener('click', function () {
      W[loop] = function () {};
    });
    C.log(A, loop && W[loop]());
  },
};

function swing(pos, angle, amount) {
  var rad = U.deg2rad(angle);
  return {
    x: pos.x + Math.cos(rad) * amount,
    y: pos.y + Math.sin(rad) * amount,
  };
}

function _loop() {
  var pos = A.scan();
  pos.y *= 10;
  pos = swing(pos, U.runTime(), 100);
  // A.clear();
  A.circ(8, pos.x, pos.y);
  return requestAnimationFrame(_loop);
}

(function () {
  A.init('_loop', _loop);
}());

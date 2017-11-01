/*global UTIL, Angle, Point, Space, */
var W = window;
var C = W.console;
var U = UTIL;
var A = {
  arc: new Angle(),
  grid: new Space(),
  pos: new Point(),
  time: {
    started: Date.now(), // store run time
    get elapsed() { // calc elapsed time
      return Date.now() - this.started;
    },
  },
  circ: function (r, x, y) {
    U.drawCircle.call(this.ctx, x, y, r);
  },
  clear: function () {
    U.clearCanvas.call(this.ctx);
  },
  fade: function () {
    U.fadeCanvas.call(this.ctx);
  },
  scan: function () {
    return this.grid.indexPosition(this.time.elapsed, true);
  },
  stop: function () {},
  start: function () {
    // kicker
    this.loop = function () {
      this.run(), requestAnimationFrame(this.loop);
    }.bind(this);
    // killer
    this.stop = function () {
      this.loop = function () {};
    };
    return this.loop(), this;
  },
  init: function (fn) {
    this.run = fn;
    this.can = document.getElementById('Test');
    this.ctx = this.can.getContext('2d');
    this.grid = new Space(W.innerWidth, W.innerHeight);
    this.can.width = this.grid.w, this.can.height = this.grid.h;
    C.log(this.start());
    W.addEventListener('click', this.stop.bind(this));
  },
};

(function () {
  var radius = 10;
  var bounce = 30;
  var vscale = 20;
  var offset = 100;

  A.init(function draw() {
    var time = this.time.elapsed;
    var scan = this.scan();
    var size = radius + scan.y; // grow

    this.fade(); // do not clear
    this.arc.deg = time;
    this.pos.read(scan);
    this.pos.y *= vscale;
    this.pos.y += offset;
    this.pos.translate(bounce, this.arc);
    this.circ(size, this.pos.x, this.pos.y);
  });
}());

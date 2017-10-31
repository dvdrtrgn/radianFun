var UTIL = {
  // store run time
  startTime: Date.now(),
  clearCanvas: function () {
    this.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  drawCircle: function (x, y, radius) {
    this.beginPath();
    this.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.stroke();
  },
  // get coordinates from set of all positions
  indexPosition: function (i, alt) {
    var w = this.width;
    var y = (i / w) | 0;
    var rev = (alt && y % 2);
    var x = i % w;
    return {
      y: y,
      x: rev ? w - x : x,
    };
  },
  // get elapsed time
  runTime: function () {
    return Date.now() - this.startTime;
  },
};

UTIL;

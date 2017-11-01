var UTIL = {
  clearCanvas: function () {
    this.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  drawCircle: function (x, y, radius) {
    this.beginPath();
    this.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.stroke();
  },
};

UTIL;

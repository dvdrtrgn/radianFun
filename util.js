var UTIL = {
  clearCanvas: function () {
    this.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  fadeCanvas: function () {
    this.fillStyle = 'rgba(128, 128, 128, 0.2)';
    this.fillRect(0, 0, this.canvas.width, this.canvas.height);
  },
  drawCircle: function (x, y, radius) {
    this.fillStyle = 'black';
    this.beginPath();
    this.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.stroke();
    this.fill();
  },
};

UTIL;

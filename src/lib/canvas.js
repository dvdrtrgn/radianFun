/*
  Model a Canvas element
  Provide helper methods
*/
const DARK = 'black';
const MIST = 'rgba(128, 128, 128, 0.2)';

function Canvas(id, grid) {
  if (!id) return;
  let ele = document.getElementById(id);
  let ctx = ele.getContext('2d');

  ele.width = grid.w;
  ele.height = grid.h;

  Object.assign(this, {
    circle: function (x, y, radius, color) {
      ctx.fillStyle = color || DARK;
      ctx.strokeStyle = 'white';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      ctx.stroke();
      ctx.fill();
    },
    clear: function () {
      ctx.clearRect(0, 0, ele.width, ele.height);
      return this;
    },
    fade: function () {
      ctx.fillStyle = MIST;
      ctx.fillRect(0, 0, ele.width, ele.height);
      return this;
    },
  });
}

export default Canvas;

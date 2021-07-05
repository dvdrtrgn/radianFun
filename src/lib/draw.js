const Draw = (function () {
  let dark = 'black';
  let mist = 'rgba(128, 128, 128, 0.2)';

  // ----------------------------
  function DRW(id, grid) {
    if (!id) return;
    let can = document.getElementById(id);
    let ctx = can.getContext('2d');

    can.width = grid.w, can.height = grid.h;

    Object.assign(this, {
      circle: function (x, y, radius, color) {
        ctx.fillStyle = color || dark;
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.fill();
      },
      clear: function () {
        ctx.clearRect(0, 0, can.width, can.height);
        return this;
      },
      fade: function () {
        ctx.fillStyle = mist;
        ctx.fillRect(0, 0, can.width, can.height);
        return this;
      },
    });
  }

  return DRW;
}());

export default Draw;

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
      circle: function (x, y, radius) {
        ctx.fillStyle = dark;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.fill();
      },
      clear: function () {
        ctx.clearRect(0, 0, can.width, can.height);
      },
      fade: function () {
        ctx.fillStyle = mist;
        ctx.fillRect(0, 0, can.width, can.height);
      },
    });
  }

  return DRW;
}());

new Draw;
const Runner = (function () {
  const W = window;
  const C = W.console;

  // ----------------------------
  function RNR() {
    const I = this;
    let run;
    let loop;
    let start;
    let frames = 0;
    let elapsed = 0;

    Object.assign(I, {
      time: {
        get started() {
          return start;
        },
        get elapsed() {
          return elapsed = Date.now() - start;
        },
      },
      stop: function () {
        W.removeEventListener('click', I.stop);
        W.addEventListener('click', I.go);
        loop = function () {
          C.log({
            elapsed, frames,
            fps: frames / (elapsed / 1000),
          });
        };
      },
      go: function () {
        W.removeEventListener('click', I.go);
        W.addEventListener('click', I.stop);
        start = Date.now() - elapsed; // hacky way to pause
        (loop = function () {
          run(), requestAnimationFrame(loop);
          frames++;
        })();
        return I;
      },
      init: function (fn) {
        run = fn;
        C.log(I.go());
      },
    });
  }

  return RNR;
}());

new Runner;
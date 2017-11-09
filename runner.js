import {W, C} from './_globs.js';

const Runner = (function () {
  function RNR() {
    const I = this;
    let run;
    let loop;
    let start = 0;
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
          I.time.elapsed; // force update
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

export {Runner};

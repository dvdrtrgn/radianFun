import {W, C} from './_globs.js';

const Looper = (function () {

  // ----------------------------
  // CSTR
  function RNR() {
    const I = this;
    let run;
    let loop;
    let start = 0;
    let frames = 0;
    let elapsed = 0;
    let press = 'Space';
    let trig = 'keydown';

    Object.assign(I, {
      time: {
        get started() {
          return start;
        },
        get elapsed() {
          return elapsed = Date.now() - start;
        },
      },
      stop: function (evt) {
        if (evt && evt.code !== press) return;
        W.removeEventListener(trig, I.stop);
        W.addEventListener(trig, I.go);
        loop = function () {
          I.time.elapsed; // force update
          C.log({
            elapsed, frames,
            fps: frames / (elapsed / 1000),
          });
        };
      },
      go: function (evt) {
        if (evt && evt.code !== press) return;
        W.removeEventListener(trig, I.go);
        W.addEventListener(trig, I.stop);
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

export default Looper;

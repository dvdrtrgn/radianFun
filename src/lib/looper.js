function Looper() {
  const self = this;
  let run;
  let loopFn;
  let start = 0;
  let frames = 0;
  let elapsed = 0;

  Object.assign(self, {
    time: {
      get started() {
        return start;
      },
      get elapsed() {
        return (elapsed = Date.now() - start);
      },
    },
    stop: function () {
      window.removeEventListener('click', self.stop);
      window.addEventListener('click', self.go);

      loopFn = function () {
        self.time.elapsed; // force update
        console.log({
          elapsed,
          frames,
          fps: frames / (elapsed / 1000),
        });
      };
    },
    go: function () {
      window.removeEventListener('click', self.go);
      window.addEventListener('click', self.stop);

      start = Date.now() - elapsed; // hacky way to pause
      loopFn = function () {
        run();
        requestAnimationFrame(loopFn);
        frames++;
      }
      loopFn();
    },
    init: function (fn) {
      run = fn;
      self.go();
    },
  });
}

export default Looper;

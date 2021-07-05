function Runner() {
  const self = this;
  let run;
  let loop;
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
      loop = function () {
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
      (loop = function () {
        run(), requestAnimationFrame(loop);
        frames++;
      })();
      return self;
    },
    init: function (fn) {
      run = fn;
      console.log(self.go());
    },
  });
}

export default Runner;

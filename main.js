/*global CSS_COLORS, Draw, Mover, Runner, Space, Vector, */
const W = window;
const C = W.console;
const AREA = new Space(W.innerWidth, W.innerHeight);
const LOOP = new Runner();
const MOUSE = new Vector(AREA.x, AREA.y);
const PAINT = new Draw('Test', AREA);
const _watchMouse = (evt) => MOUSE.read(evt.offsetX, evt.offsetY);
const rando = (top = 9) => Math.random() * (1 + top) | 0;
const color = () => CSS_COLORS[rando(CSS_COLORS.length)];

// ---------
// etc
W.addEventListener('mousemove', _watchMouse);

function followMouse(mover) {
  let acc = new Vector(MOUSE.x, MOUSE.y).sub(mover.loc);
  mover.vel.limit = acc.mag; // faster for far away
  acc.mag = 3; // obedience
  return acc;
}

function run() {
  let movers = Array(5).fill(0);
  movers = movers.map((e, i) => new Mover(i, color(), rando(10) + 10));
  movers.forEach(function (m) {
    m.addForce(new Vector((rando(100) - 50) / 10, 0));
  });
  LOOP.init(function () {
    PAINT.clear();
    movers.forEach(function (m) {
      m.addForce(new Vector(0, 2)) // weight
        // .addForce(followMouse(m))
        // .addForce(Vector.random()) // excitement
        .update();
    });
  });
  C.log(movers);
}

window.setTimeout(run, 99);

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
  const wind = new Vector(0.01, 0);
  const gravity = new Vector(0, 1);
  let movers = Array(5).fill(0);

  movers = movers.map(function (e, i) {
    let size = rando(9) + 1;
    let mass = size / 10;
    let radius = size + 10;
    let m = new Mover(i, mass, radius);

    m.x = mass * AREA.w;
    m.cf.color = color();
    m.addForce(new Vector(rando(10) - 5, rando(10) - 5));

    return m;
  });

  LOOP.init(function () {
    PAINT.clear();
    movers.forEach(function (m) {
      m.addForce(Vector.mult(gravity, m.mass)) // weight
        .addForce(wind)
        // .addForce(followMouse(m))
        // .addForce(Vector.random()) // excitement
        .update();
    });
  });
  C.log(movers);
}

window.setTimeout(run, 99);

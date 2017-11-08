/*global W, C, MOUSE, AREA, CSS_COLORS, Draw, Mover, Runner Vector, */
const LOOP = new Runner();
const PAINT = new Draw('Test', AREA);
const color = () => CSS_COLORS[rando(CSS_COLORS.length - 1)];
const rando = (top = 9) => Math.random() * (1 + top) | 0;

// ---------
// etc

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

  movers = movers.map(function () {
    let name = color();
    let size = rando(19) + 1;
    let mass = size / 10;
    let radius = size + 10;
    let m = new Mover(name, mass, radius);

    m.x = mass * AREA.w;
    m.cf.color = name;
    m.addForce(new Vector(rando(10) - 5, rando(10) - 5));

    return m;
  });

  // move bigger to back
  movers.sort((a, b) => a.mass < b.mass);

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

W.setTimeout(run, 99);

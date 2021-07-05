import Space from './lib/Space';
import Canvas from './lib/Canvas';
import Looper from './lib/Looper';
import Vector from './lib/Vector';

export const BOUNDS = new Space(window.innerWidth, window.innerHeight);
export const CANVAS = new Canvas('Paint', BOUNDS);
export const LOOP = new Looper();

// MOUSE (Vector) x,y (in Space) starts at center by default
export const MOUSE = new Vector(BOUNDS.x, BOUNDS.y);
const _watchMouse = (evt) => MOUSE.input(evt.offsetX, evt.offsetY);
window.addEventListener('mousemove', _watchMouse);

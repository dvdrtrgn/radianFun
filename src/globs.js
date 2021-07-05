import Space from './lib/Space';
import Canvas from './lib/Canvas';
import Looper from './lib/Looper';
import Vector from './lib/Vector';

export const SPACE = new Space(window.innerWidth, window.innerHeight);
export const CANVAS = new Canvas('Paint', SPACE);
export const LOOP = new Looper();
// space x,y starts at center by default
export const MOUSE = new Vector(SPACE.x, SPACE.y);

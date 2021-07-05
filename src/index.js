import * as globs from './globs';
import main from './main.js';

const app = { main, ...globs };

console.log(app);

main.run();

window.app = app;

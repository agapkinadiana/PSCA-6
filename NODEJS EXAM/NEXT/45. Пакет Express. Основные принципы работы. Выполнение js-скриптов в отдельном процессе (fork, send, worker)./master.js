const child = require('child_process');
const fp = child.fork('support.js');

const f = () => {
    console.log('master');
};
setInterval(f, 3000);

let x = 0;
const s = () => {
    fp.send(`from master: ${++x}`);
};
setInterval(s, 6000);

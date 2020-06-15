const express = require('express');
const app = express();
const child = require('child_process');
const fp = child.fork('./index2.js');

const f = () => {
    console.log('file 1');
}
setInterval(f, 3000);

let x = 0;
const s = () => {
    fp.send(`msg from file1: ${++x}`);
}
setInterval(s, 6000);

app.listen(3000);

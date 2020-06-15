const child = require('child_process');

const f = () => {
    console.log('support');
};
setInterval(f, 6000);

process.on('message', (msg) => {
    console.log(msg);
})

const child = require('child_process');

const f = () => {
    console.log('file 2');
}
setInterval(f, 3000);

process.on('message', (msg)=> {
    console.log(msg);
});
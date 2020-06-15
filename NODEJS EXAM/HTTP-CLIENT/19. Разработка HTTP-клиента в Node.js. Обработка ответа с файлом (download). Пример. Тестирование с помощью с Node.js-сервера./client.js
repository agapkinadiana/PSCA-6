const http = require('http');
const fs = require('fs');

let file = fs.createWriteStream("teext.txt");

let options  = {
    host:'localhost',
    path:'/Text.txt',
    port:3000,
    method:'GET',
};
const request = http.request(options,(response) =>{
    console.log('method: ', request.method);
    console.log('response: ', response.statusCode);
    console.log('statusMessage: ', response.statusMessage);

    response.pipe(file);
});

request.on('error', (e)=>{ console.log('error:', e.message);});
request.end();



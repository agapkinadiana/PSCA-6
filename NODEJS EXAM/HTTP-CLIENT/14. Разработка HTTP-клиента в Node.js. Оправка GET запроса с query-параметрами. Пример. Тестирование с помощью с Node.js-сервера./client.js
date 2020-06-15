const http = require('http');
const query = require('querystring');

let parms = query.stringify({x:3, y:4, s:'xxxx'});
let path = `/mypath?${parms}`;

console.log('parms', parms);
console.log('path', path);

let options  = {
    host:'localhost',
    path:path,
    port:3000,
    method:'GET'
};

const request = http.request(options,(response)=>{
    let data ='';
    response.on('data', (chunk)=>{
        console.log('data: body: ', data += chunk.toString('utf-8'));
    });
});
request.on('error', (e) =>{
    console.log('http.request: error:', e.message);
});

request.end();

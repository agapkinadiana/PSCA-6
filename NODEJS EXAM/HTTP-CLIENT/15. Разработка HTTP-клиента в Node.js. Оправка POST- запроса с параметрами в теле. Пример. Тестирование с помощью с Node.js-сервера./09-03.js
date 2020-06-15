var http =require('http');
var query= require('querystring');

let parms=query.stringify({x:3,y:4, s:"aaa"});

let options= {
    host: 'localhost',
    path: '/threepar',
    port: 5000,
    method:'POST'
}
const req = http.request(options,(res)=> {
    console.log('Error: statusCode: ', res.statusCode);
    let data = '';
    res.on('data', (chunk) => {
        console.log('From server: ', data += chunk.toString('utf-8'));
    });
});
req.on('error', (e)=> {
    console.log('Error:', e.message);
});
req.write(parms);
req.end();
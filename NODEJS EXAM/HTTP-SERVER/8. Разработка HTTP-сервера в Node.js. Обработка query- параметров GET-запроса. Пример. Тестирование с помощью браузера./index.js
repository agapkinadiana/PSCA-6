// const http = require ('http');
// const url = require ('url');
//
// let handler = (request, response) => {
//     if(request.method ==='GET'){
//         let result = '';
//         let p = url.parse(request.url, true);
//         let q = url.parse(request.url, true).query;
//
//         if (!(p.pathname =='/favicon.ico')) {
//             result = `href: ${p.href}<br/>` +
//                 `path: ${p.path}<br/>` +
//                 `pathname: ${p.pathname}<br/>` +
//                 `search: ${p.search}<br/>`;
//             //http://localhost:3000/?p=4&q=3
//             for (key in q) {
//                 result += `${key} = ${q[key]}<br/>`;
//             }
//         }
//
//         response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
//         response.write('<h3>GET-parameters</h3>');
//         response.end(result);
//     }
// }
//
// let server = http.createServer();
// server.listen(3000, (v) => {console.log('run')})
//         .on("error", (e)=>{console.log("Server error: "+e.code)})
//         .on("request", handler);

const http = require('http');
const url = require('url');
let quer;
let server = http.createServer((req, res) => {
    var url_parts = url.parse(req.url, true);

    //console.log(url_parts);

    if (req.method == 'GET') {
        if (url_parts.pathname !== '/') {
            console.log('Invalid path');
            res.writeHead(404, {'X-Error-Message': 'Invalid path', 'Content-type': 'text/json'});
            res.end(JSON.stringify({'Error': 'Invalid path :('}));
        } else {
            if (url_parts.query.text == 'hello') {
                console.log('Client say hello');
            }
            console.log(JSON.stringify(url_parts.query));

            res.writeHead(200, {'Content-type': 'text/json'});
            res.end(JSON.stringify(url_parts.query));

        }
    } else {
        res.writeHead(404, {'X-Error-Message': 'Decline method', 'Content-type': 'text/json'});
        res.end(JSON.stringify({'Error': 'Decline method :('}));
    }
});


server.listen(3000, () => {
    console.log("Start listening port 3000");
})

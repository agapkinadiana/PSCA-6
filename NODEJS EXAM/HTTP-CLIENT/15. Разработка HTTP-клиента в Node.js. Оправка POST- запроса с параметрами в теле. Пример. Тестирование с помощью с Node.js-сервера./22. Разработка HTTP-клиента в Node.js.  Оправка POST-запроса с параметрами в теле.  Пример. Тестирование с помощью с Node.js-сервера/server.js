const http = require('http');
const fs = require('fs');
let data = "";
let server = http.createServer((req, res) => {
    //Для бразуера
    // if (req.method == 'GET' && req.url == '/') {
    //     res.writeHead(200, {'Content-type': 'text/html'});
    //     res.end(fs.readFileSync('./client.html'));
    // }
    // req.on('data', (chunk) => {
    //     data = chunk; //dat.id, dat.name, dat.bday
    //     console.log(data);
    //     console.log(data.name, data.lastName);
    //     res.writeHead(200, {'Content-type': 'text/html'});
    //     res.end(fs.readFileSync('./client.html'))
    // });

    if (req.method == "POST") {
        console.log('POST');
        req.on('data', (chunk) => {
            data += chunk; //dat.id, dat.name, dat.bday
        });

        req.on('end', ()=>{
            console.log(data);
            console.log("=============");
            let obj = JSON.parse(data);
            console.log(obj.name, obj.lastName);
            res.writeHead(200, {'Content-type': 'text/html'});
            res.end("Got it");
        });
    }
});


server.listen(3000, () => {
    console.log("Start listening port 3000");
})

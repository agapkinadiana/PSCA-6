let http = require("http");

let my_module = require("./m07.js");


let server = http.createServer();

server.listen(3000, (v) =>{ console.log("Server is running (port: 3000)")})
    .on("error", (e)=>{console.log("Server error: "+e.code)})
    .on("request", my_module);



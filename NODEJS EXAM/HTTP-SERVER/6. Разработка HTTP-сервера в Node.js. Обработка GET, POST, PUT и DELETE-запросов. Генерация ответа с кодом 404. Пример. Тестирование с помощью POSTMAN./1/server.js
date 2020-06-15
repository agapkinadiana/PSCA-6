const http = require("http");
const url = require("url");
const fs = require("fs");

const data = require("./m04-02.js");
const db = new data.DB();

let HTTP404 = (res) => {
    res.statusCode = 404;
    res.statusMessage = "Resource not found";
    res.end("<h1>Resource not found</h1>");
};

db.on("POST", (req, res) => {
    req.on("data", data=>{
         let req_data = JSON.parse(data);
         db.post(req_data);
         res.end(JSON.stringify(req_data));         
    });
    
});

db.on("GET", (req, res) => {res.end(JSON.stringify(db.get()));});

db.on("PUT", (req, res) => {
    req.on("data", (data)=>{
        console.log("PUT");
        let req_data = JSON.parse(data);
        db.put(req_data);
        res.end(JSON.stringify(req_data));
    });
});

db.on("DELETE", (req, res) => {
    req.on("data", data=>{
        console.log("DELETE");
        let req_data = JSON.parse(data);
        db.delete(req_data);
        res.end(JSON.stringify(req_data));         
   });
});

http.createServer(function(request, response){

   if(url.parse(request.url).pathname === "/api/db"){
       db.emit(request.method, request, response);
   }
	else HTTP404(response);

}).listen("3000");
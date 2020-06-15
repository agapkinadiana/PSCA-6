let fs = require("fs");
let query = require("querystring");

let isStatic = (ext, fn) => {
    let reg = new RegExp(`^\/.+\.${ext}$`);
    return reg.test(fn);
};

let pathStatic = (fn)=>{
    return `./static${fn}`;
};

let HTTP404 = (res) => {
    res.statusCode = 404;
    res.statusMessage = "Resource not found";
    res.end("<h1>Resource not found</h1>");
};

let HTTP405 = (res) => {
    res.statusCode = 405;
    res.statusMessage = "Invalid method";
    res.end("This is not GET");
};

let pipeFile = (req, res, headers) => {
    res.writeHead(200, headers);
    fs.createReadStream(pathStatic(req.url)).pipe(res);
};

let sendFile = (req, res, headers)=>{
    fs.access(pathStatic(req.url), fs.constants.R_OK, err => {  //доступ к файлу
                //R_OK - Путь может быть прочитан вызывающим процессом
        if(err)
            HTTP404(res);
        else
            pipeFile(req, res, headers);
    })

};

let http_handler = function(req, res) {
    if(req.method !== "GET"){
        HTTP405(res);
    } else{
        if(isStatic("html", req.url))
            sendFile(req,res, {"Content-Type":"text/html; charset=utf-8"});
        else if(isStatic("css", req.url))
            sendFile(req,res, {"Content-Type":"text/css; charset=utf-8"});
        else if(isStatic("js", req.url))
            sendFile(req,res, {"Content-Type":"text/javascript; charset=utf-8"});
        else if(isStatic("docx", req.url))
            sendFile(req,res, {"Content-Type":"application/msword;"});
        else if(isStatic("doc", req.url))
            sendFile(req,res, {"Content-Type":"application/msword;"});
        else if(isStatic("json", req.url))
            sendFile(req,res, {"Content-Type":"application/json;"});
        else if(isStatic("png", req.url))
            sendFile(req,res, {"Content-Type":"image/png;"});
        else
            HTTP404(res);
    }
};

module.exports = http_handler;
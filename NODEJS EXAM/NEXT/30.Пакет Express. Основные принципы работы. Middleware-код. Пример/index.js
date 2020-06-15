// подключение express
const express = require("express");
// создаем объект приложения
const app = express();
const fs = require('fs');
/*1 пример*/

app.use(function(request, response, next){
    console.log("Middleware 1");
    next();
});
app.use(function(request, response, next){
    console.log("Middleware 2");
    next();
    //response.send("Middleware 2");//обработка завершается на Middleware 2, так как в этом методе происходит отправка ответа с помощью response.send()
});

app.get("/", function(request, response){
    console.log("Route /");
    // response.attachment('unnamed.png');
    // let rs = fs.ReadStream('./unnamed.png');
    // rs.pipe(response);
    response.send("Hello");

});


/*2 пример*/
/*

app.use(function(request, response, next){

    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(data);
    fs.appendFile("server.log", data + "\n", function(){});
    next();
});

app.get("/", function(request, response){
    response.send("Hello");
});
*/

app.listen(3000);
console.log('server run http://localhost:3000/');

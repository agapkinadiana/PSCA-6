const app = require("express")();

// app.get('/', (req, res, next) => {
//     console.log('get query params = ', req.query);
//
//     if (req.query.x) console.log('x = ', req.query.x);
//     else console.log('x не задан');
//
//     if (req.query.y) console.log('y = ', req.query.y);
//     else console.log('y не задан');
// });

app.get("/", function(request, response){
    response.send("<h1>Главная страница</h1>");
});
app.use("/about", function(request, response){

    let id = request.query.id;
    let userName = request.query.name;
    response.send("<h1>Информация</h1><p>id=" + id +"</p><p>name=" + userName + "</p>");
});

app.listen(3000);

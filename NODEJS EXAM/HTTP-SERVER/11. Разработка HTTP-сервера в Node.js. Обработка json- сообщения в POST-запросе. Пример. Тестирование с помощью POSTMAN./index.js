const http = require ('http');
const url = require ('url');

let handler = (request, response) => {
    if(request.method === 'POST' && url.parse(request.url).pathname === '/json'){
        let data = '';
        request.on('data', (chunk) => {
            data += chunk;
        });

        request.on('end', () => {
            data = JSON.parse(data);
            response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
            let comment = 'Ответ.' + data.__comment.split('.')[1];
            let resp = {};
            resp.__comment = comment;
            resp.x_plus_y = data.x + data.y;
            resp.Concatenation_message_about = data.message + ', ' + data.about.surname + ', ' + data.about.name;
            resp.Length_array = data.array.length;
            response.end(JSON.stringify(resp));
        })
    }
}

let server = http.createServer();
server.listen(3000, (v) => {console.log('run')})
        .on("error", (e)=>{console.log("Server error: "+e.code)})
        .on("request", handler);

/*{
	"__comment": "Запрос.hello",
	"x": 1,
	"y": 5,
	"message": "lalala",
	"array": ["a", "b"],
	"about": {"surname":"Diana", "name":"Di"}
}*/
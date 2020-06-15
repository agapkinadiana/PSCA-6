const http= require('http');
const url = require('url');

const facultiesHandler = require('./api/faculties');
const pulpitsHandler = require('./api/pulpits');
const subjectsHandler = require('./api/subjects');
const auditoriumsHandler = require('./api/auditoriums');
const auditoriumTypesHandler = require('./api/auditorium-types');

http.createServer((Request, Response)=>{
    console.log(url.parse(Request.url).pathname);
    if(Request.method=='GET'){
        switch (Request.url){
            case '/api/faculties':{
                facultiesHandler.get(Request,Response);
                break;
            }
            case '/api/pulpits' :{
                pulpitsHandler.get(Request,Response);
                break;
            }
            case '/api/subjects':{
                subjectsHandler.get(Request,Response);
                break;
            }
            case '/api/auditoriums':{
                auditoriumsHandler.get(Request, Response)
                break;
            }
            case '/api/auditorium-types':{
                auditoriumTypesHandler.get(Request, Response)
                break;
            }
        }
    }
    else if(Request.method=='POST'){
        switch (Request.url){
            case '/api/faculties':{
                facultiesHandler.post(Request,Response);
                break;
            }
            case '/api/pulpits' :{
                pulpitsHandler.post(Request,Response);
                break;
            }
            case '/api/subjects':{
                subjectsHandler.post(Request,Response);
                break;
            }
            case '/api/auditoriums':{
                auditoriumsHandler.post(Request, Response)
                break;
            }
            case '/api/auditorium-types':{
                auditoriumTypesHandler.post(Request, Response)
                break;
            }
        }
    }
    else if(Request.method=='PUT'){
        switch (Request.url){
            case '/api/faculties':{
                facultiesHandler.put(Request,Response);
                console.log('faculties');
                break;
            }
            case '/api/pulpits' :{
                pulpitsHandler.put(Request,Response);
                console.log('pulpits');
                break;
            }
            case '/api/subjects':{
                subjectsHandler.put(Request,Response);
                break;
            }
            case '/api/auditoriums':{
                auditoriumsHandler.put(Request, Response)
                break;
            }
            case '/api/auditorium-types':{
                auditoriumTypesHandler.put(Request, Response)
                break;
            }
        }
    }
    else if(Request.method=='DELETE'){
        switch (url.parse(Request.url).pathname.split('/')[2]){
            case 'faculties':{
                facultiesHandler.delete(Request,Response);
                console.log('faculties');
                break;
            }
            case 'pulpits' :{
                pulpitsHandler.delete(Request,Response);
                console.log('pulpits');
                break;
            }
            case 'subjects':{
                subjectsHandler.delete(Request,Response);
                break;
            }
            case 'auditoriums':{
                auditoriumsHandler.delete(Request, Response)
                break;
            }
            case 'auditorium-types':{
                auditoriumTypesHandler.delete(Request, Response)
                break;
            }
        }
    }
}).listen(3000);

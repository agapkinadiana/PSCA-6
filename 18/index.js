const MyExpress = require('@ilya-matsuev/my-express');

const facultiesHandler = require('./api/faculties');
const pulpitsHandler = require('./api/pulpits');
const subjectsHandler = require('./api/subjects');
const auditoriumsHandler = require('./api/auditoriums');
const auditoriumTypesHandler = require('./api/auditorium-types');

const config = require('./config').server;

const app = new MyExpress();

app.static('./public');

app.get('/api/faculties', facultiesHandler.get);
app.get('/api/pulpits', pulpitsHandler.get);
app.get('/api/subjects', subjectsHandler.get);
app.get('/api/auditoriums', auditoriumsHandler.get);
app.get('/api/auditorium-types', auditoriumTypesHandler.get);

app.post('/api/faculties', facultiesHandler.post);
app.post('/api/pulpits', pulpitsHandler.post);
app.post('/api/subjects', subjectsHandler.post);
app.post('/api/auditoriums', auditoriumsHandler.post);
app.post('/api/auditorium-types', auditoriumTypesHandler.post);

app.put('/api/faculties', facultiesHandler.put);
app.put('/api/pulpits', pulpitsHandler.put);
app.put('/api/subjects', subjectsHandler.put);
app.put('/api/auditoriums', auditoriumsHandler.put);
app.put('/api/auditorium-types', auditoriumTypesHandler.put);

app.delete('/api/faculties/:faculty', facultiesHandler.delete);
app.delete('/api/pulpits/:pulpit', pulpitsHandler.delete);
app.delete('/api/subjects/:subject', subjectsHandler.delete);
app.delete('/api/auditoriums/:auditorium', auditoriumsHandler.delete);
app.delete('/api/auditorium-types/:auditoriumType', auditoriumTypesHandler.delete);

app.listen(config.port, config.host, () => {
    console.log(`Listening to http://${config.host}:${config.port}`);
});

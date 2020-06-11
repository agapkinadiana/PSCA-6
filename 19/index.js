const express = require('express');
const bodyParser = require('body-parser');

const homeRoute = require('./controllers/home-controller');
const loginRoute = require('./controllers/login-controller');
const registerRoute = require('./controllers/register-controller');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: null}));

app.use('/home', homeRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);

app.listen(3000, () => {
    console.log(`Listening to http://localhost:3000`);
    console.log(`Home: http://localhost:3000/home`);
    console.log(`Login: http://localhost:3000/login`);
    console.log(`Register: http://localhost:3000/register`);
});

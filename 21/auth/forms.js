const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const Users = require('./../secure/users') || [];
const config = require('./../config').forms;
const formsRouter = express.Router();

formsRouter.use(cookieParser());
formsRouter.use(bodyParser.urlencoded({extended: false}));

formsRouter.get('/', (request, response) => response.redirect('/forms/login'));

formsRouter.get('/login', (request, response) => {
    response.sendFile('index.html', {root: './'});
});

formsRouter.post('/login', (request, response) => {
    const {username, password} = request.body;
    const targetUser = Users.find(user => user.username === username && user.password === password);
    if (targetUser) {
        jwt.sign({user: targetUser}, config.secret, (err, token) => {
            if (err) {
                response.redirect('/forms/login?error=internal_error');
            } else {
                response.cookie('token', token);
                response.redirect('/forms/resource');
            }
        })
    } else {
        response.redirect('/forms/login?error=invalid_username_or_password');
    }
});

formsRouter.get('/logout', (request, response) => {
    response.clearCookie('token');
    response.redirect('/forms/login');
});

formsRouter.get('/resource', (request, response) => {
    const token = request.cookies.token;
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            response.redirect('/forms/login');
        } else {
            response.json(Users);
        }
    });
});

module.exports = formsRouter;

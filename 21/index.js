const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const basicAuth = require('./auth/basic');
const digestAuth = require('./auth/digest');
const formsRouter = require('./auth/forms');

const config = require('./config');
const auth = {
    basic: {
        name: 'basic',
        middleware: basicAuth
    },
    digest: {
        name: 'digest',
        middleware: digestAuth
    }
};

passport.use(auth.digest.middleware);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const app = express();

app.use(bodyParser.json());
app.use(session(config.server.session));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (request, response) => response.redirect('/login'));

app.get('/login', (request, response, next) => {
    if (request.session.logout) {
        delete request.headers['authorization'];
        request.session.logout = false;
    }
    next();
}, passport.authenticate(auth.digest.name), (request, response) => response.redirect('/resource'));

app.get('/logout', (request, response) => {
    request.logout();
    request.session.logout = true;
    response.redirect('/login');
});

app.get('/resource', (request, response) => {
    if (!request.headers['authorization']) {
        response.redirect('/login');
        return;
    }
    response.json(require('./secure/users'));
});

app.use('/forms', formsRouter);

app.use((request, response) => response.status(404));

app.listen(config.server.port, () => {
    console.log(`Listening to http://localhost:${config.server.port}`);
});

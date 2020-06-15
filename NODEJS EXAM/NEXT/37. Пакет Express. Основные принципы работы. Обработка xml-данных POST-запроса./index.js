const express = require('express');
const app = express();
const xmlparser = require('express-xml-bodyparser');
const xmlbuilder = require('xmlbuilder');
const parseString = require('xml2js').parseString;

app.use(xmlparser());
app.post('/xml', (req, res, next) => {
    console.log('req.body = ', req.body);

    let x = Number(req.body.calculate.x[0].$.value);
    let y = Number(req.body.calculate.y[0].$.value);

    let result = xmlbuilder.create('result').att('task', '2');
    result.ele('sum', {value:x+y});

    console.log('result = \n', result.toString({pretty:true}));
    res.send(result.toString({pretty:true}));
});

app.listen(3000);

// <calculate>
// <x value="1"/>
// <y value="2"/>
//     </calculate>



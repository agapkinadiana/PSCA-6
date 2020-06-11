const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');

const tsRoute = require('./routes/ts');
const swaggerConfig = require('./docs/swagger-config');
const app = express();

app.use(bodyParser.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig));
app.use('/ts', tsRoute);

app.listen(3000, () => console.log(`Listening to http://localhost:3000/`));

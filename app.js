const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const { initializeMongoDB } = require('./services/mongodb');
const logger = require('./services/logger');

const routes = require('./routes');
const { port, mongoRoute } = require('./config');

initializeMongoDB(mongoRoute)

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/data', routes);
app.get('/', (req, res) => res.send('hello world'));
app.listen(port, () => logger.info(`App listening at port ${port}`));

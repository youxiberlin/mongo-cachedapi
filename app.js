const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { port, mongoID, mongoPW } = require('./config');

const app = express();
app.get('/', (req, res) => res.send('hello world'));
app.listen(port, () => console.loggit(`App listening at port ${port}`));

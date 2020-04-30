const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const { port, dbRoute } = require('./config');

mongoose.connect(dbRoute, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => console.log('connected to mongoDB'),
	err => console.log(`mongoDB connection error: ${err}`))

const app = express();
app.use('/data', routes);
app.get('/', (req, res) => res.send('hello world'));
app.listen(port, () => console.log(`App listening at port ${port}`));

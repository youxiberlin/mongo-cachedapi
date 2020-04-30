const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const { port, dbRoute } = require('./config');

mongoose.connect(dbRoute, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => console.log('connected to mongoDB'),
	err => console.log(`mongoDB connection error: ${err}`))

const app = express();
app.get('/', (req, res) => res.send('hello world'));
app.listen(port, () => console.log(`App listening at port ${port}`));

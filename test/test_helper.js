const mongoose = require('mongoose');
const dataSchema = require('../models/data');
const sampleData = require('./data/sampleData');

const Data =mongoose.connection.model('Data', dataSchema);
Data.insertMany(sampleData, (err, docs) => {
	if (err) console.log(err);
	console.log(`docs: ${docs}`);
});

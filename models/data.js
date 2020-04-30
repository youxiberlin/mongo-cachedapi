const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
	key: { type: String },
	data: { type: String },
	createAt: { type: Number }
});

module.exports = dataSchema;

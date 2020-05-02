const mongoose = require('mongoose');
const { ttlSeconds } = require('../config');

const Schema = mongoose.Schema;
const dataSchema = new Schema({
	key: { type: String },
	data: { type: String },
}, {timestamps: true});

dataSchema.index({ createdAt: 1 },{ expireAfterSeconds: ttlSeconds });

module.exports = dataSchema;

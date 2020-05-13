const mongoose = require('mongoose');
const dataSchema = require('./models/data');
const mapper = require('./services/mapper');
const makeRandomStr = require('./services/randomStr');
const { dbCacheLimit } = require('./config');
const logger = require('./services/logger');
const validate = require('./services/validator');
const definitions = require('./services/definitions');

const Data = mongoose.model('Data', dataSchema);
const checkCacheLimit = (dataCount, cacheLimit) => dataCount >= cacheLimit;

const getData = async (req, res) => {
	const data = await Data.find({ key: req.params.key });
	const dataCount = await Data.countDocuments({});
	const cacheLimitExceeds = checkCacheLimit(dataCount, dbCacheLimit);
	
	if (!data.length) {
		logger.info('cache miss');
		const randomStr = makeRandomStr();
		const newData = new Data({
			key: req.params.key,
			data: randomStr,
			createAt: Date.now(),
		});
		
		if (cacheLimitExceeds) {
			logger.info('cacheLimit exceeds');
			await Data.findOne({}, {}, { sort: { 'createAt': 1} }, async (err, doc) => {
				if (err) logger.error(err);
				await Data.findOneAndUpdate(
					{ key: doc.key },
					{
						key: req.params.key,
						data: randomStr,
						createAt: Date.now()
					},
					{new: true},
					(err, doc) => {
						if (err) logger.error(`err: ${err}`);
						const result = mapper(['data', 'key'], doc);
						res.send(result);
					}
					);
				});
			}
			
		await newData.save();
		const result = mapper(['key', 'data'], newData);
		const isValid = validate(result, definitions.data);
		if (!isValid) logger.warn('validation error');
		res.send(result);
	} else {
		logger.info(`cache hit!`);
		res.send(mapper(['key', 'data'], data[0]));
	}
};

const getAllData = async (req, res) => {
	await Data.find({}, (err, docs) => {
		if (err) logger.error(err);
		const result = docs.map(doc => mapper(['data', 'key'], doc))
		res.send({ data: result });
	});
};

const updateData = async (req, res) => {
	await Data.findOneAndUpdate(
		{ key: req.params.key },
		req.body,
		{new: true},
		(err, doc) => {
			if (err) logger.error(err);
			res.send(doc)
		}
	);
};

const deleteData = async (req, res) => {
	await Data.findOneAndDelete(
		{ key: req.params.key },
		(err, doc) => {
			if (err) logger.error(err);
			res.send(doc)
		}
	);
};

const deleteAllData = async (req, res) => {
	await Data.deleteMany({}, (err,doc) => {
		if (err) logger.error(err);
		res.send({
			success: true,
			deletedCount: doc.deletedCount
		})
	});
};

module.exports = {
	getData,
	getAllData,
	updateData,
	deleteData,
	deleteAllData
};

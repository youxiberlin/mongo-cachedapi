const mongoose = require('mongoose');
const dataSchema = require('./models/data');
const mapper = require('./services/mapper');
const makeRandomStr = require('./services/randomStr');
const { dbCacheLimit } = require('./config');

const Data = mongoose.model('Data', dataSchema);
const checkCacheLimit = (dataCount, cacheLimit) => dataCount >= cacheLimit;

const getData = async (req, res) => {
	const data = await Data.find({ key: req.params.key });
	const dataCount = await Data.countDocuments({});
	const cacheLimitExceeds = checkCacheLimit(dataCount, dbCacheLimit);
	
	if (!data.length) {
		console.log('cache miss');
		const randomStr = makeRandomStr();
		const newData = new Data({
			key: req.params.key,
			data: randomStr,
			createAt: Date.now(),
		});
		
		if (cacheLimitExceeds) {
			console.log('cacheLimit exceeds');
			await Data.findOne({}, {}, { sort: { 'createAt': 1} }, async (err, doc) => {
				if (err) console.log(err);
				await Data.findOneAndUpdate(
					{ key: doc.key },
					{
						key: req.params.key,
						data: randomStr,
						createAt: Date.now()
					},
					{new: true},
					(err, doc) => {
						if (err) console.log(`err: ${err}`);
						const result = mapper(['data', 'key'], doc);
						res.send(result);
					}
				);
			});
		}
		
		await newData.save();
		res.send(mapper(['key', 'data'], newData));
	} else {
		console.log(`cache hit!`);
		res.send(mapper(['key', 'data'], data[0]));
	}
};

const getAllData = async (req, res) => {
	await Data.find({}, (err, docs) => {
		if (err) console.log(err);
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
			if (err) console.log(err);
			res.send(doc)
		}
	);
};

const deleteData = async (req, res) => {
	await Data.findOneAndDelete(
		{ key: req.params.key },
		(err, doc) => {
			if (err) console.log(err);
			res.send(doc)
		}
	);
};

const deleteAllData = async (req, res) => {
	await Data.deleteMany({}, (err,doc) => {
		if (err) console.log(err);
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

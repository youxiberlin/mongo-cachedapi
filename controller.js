const mongoose = require('mongoose');
const dataSchema = require('./models/data');

const Data = mongoose.model('Data', dataSchema);
const makeRandomStr = () => Math.random().toString(36).substring(2);
const mapper = (keyArr, obj) => {
	let result = {}
	for (const key of keyArr) {
		result[key] = obj[key]
	};
	return result;
};

const getData = async (req, res) => {
	const data = await Data.find({ key: req.params.key });
	if (!data.length) {
		console.log('cache miss');
		const randomStr = makeRandomStr();
		let newData = new Data({
			key: req.params.key,
			data: randomStr,
			createAt: Date.now(),
		});
		await newData.save();
		res.send(mapper(['key', 'data'], newData));
	} else {
		console.log(`cache hit!`);
		res.send(mapper(['key', 'data'], data[0]));
	}
};

const getAllData = async (req, res) => {
	let result;
	await Data.find({}, (err, res) => {
		if (err) console.log(err);
		result = res.map(data => mapper(['key', 'data'], data))
	});
	const output = {
		data: result
	};
	res.send(output);
};

const updateData = async (req, res) => {
	await Data.findOneAndUpdate(
		{ key: req.params.key },
		req.body,
		{new: true},
		(err, doc) => {
			if (err) console.log(`err: ${err}`);
			res.send(doc)
		});
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

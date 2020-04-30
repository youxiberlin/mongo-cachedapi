const mongoose = require('mongoose');
const dataSchema = require('./models/data');

const Data = mongoose.model('Data', dataSchema)
const makeRandomStr = () => Math.random().toString(36).substring(2);

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
		res.send(newData.data);
	} else {
		console.log(`cache hit!`);
		res.send(data[0].data);
	}
};

module.exports = {
	getData
}
const mapper = (keyArr, obj) => {
	let result = {}
	for (const key of keyArr) {
		result[key] = obj[key]
	};
	return result;
};

module.exports = mapper;

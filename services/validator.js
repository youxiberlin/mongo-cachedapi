const logger = require('./logger');
const util = require('util');

const validate = (obj, def, errs = []) => {
	const keys = Object.keys(obj);
	const isArray = obj => Array.isArray(obj);
	const validateObj = key => typeof obj[key] === def[key];

	keys.forEach((key) => {
		if (isArray(obj[key])) {
			if (!isArray(def[key])) errs.push(`invalid type of data: ${key} is not Array`);
			else return validate(obj[key][0], def[key][0], errs);
		} else {
			if (!validateObj(key)) errs.push(`invalid type of data: ${util.inspect(obj[key])} is not ${def[key]} `);
		}
	});
	
	if (errs.length) {
		errs.forEach(err => logger.warn(err))
	}

	return errs.length ? false : true;
};

module.exports = validate;

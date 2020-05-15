const logger = require('./logger');
const util = require('util');

const validate = (obj, def, errs = []) => {
	const keys = Object.keys(obj);
	const isArray = obj => Array.isArray(obj);
	const validateObj = key => typeof obj[key] === def[key];

	if (isArray(def)) {
		if (!isArray(obj)) errs.push(`invalid type of data: ${key} is not Array`);
		obj.forEach(o => {
			return validate(o, def[0], errs);
		});
	} else {
		keys.forEach((key) => {
			if (!validateObj(key)) errs.push(`invalid type of data: ${util.inspect(obj[key])} is not ${def[key]} `);
		});
	}
	return errs
};

const logErrs = (obj, def) => {
	const errs = validate(obj, def)
	errs.forEach(err => logger.warn(err));
}

module.exports = logErrs;

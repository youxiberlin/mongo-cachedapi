const validate = (obj, def) => {
	const keys = Object.keys(obj);
	const errs = [];

	keys.forEach((key) => {
		const isTypeValid = typeof obj[key] === def[key];
		if (!isTypeValid) errs.push(`invalid type of data: ${obj[key]} is not ${def[key]} `);
	})
	
	if (errs.length) {
		errs.forEach(err => console.error(err))
	}
	return errs.length ? false : true;
};

module.exports = validate;

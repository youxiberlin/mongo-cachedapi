const mongoose = require('mongoose');

module.exports = (mongoRoute) => {
	mongoose.connection.on('connected', () => console.log(`connected to ${mongoRoute}`));
	mongoose.connection.on('error', () => console.log(`mongoDB connection error`));
	mongoose.connection.on('disconnected', () => console.log(`mongoDB is disconnected`));
	return mongoose.connect(mongoRoute, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true	
	});
};

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cacheapi_test');
mongoose.connection
	.once('open', () => console.log('Connected!'))
	.on('error', (error) => {
		console.warn('Error : ',error);
	});

// beforeEach((done) => {
// 	mongoose.connection.collections.cacheapi_test.drop(() => {
// 			//this function runs after the drop is completed
// 		done(); //go ahead everything is done now.
// 	});
// // });
// beforeEach((done) => {
// 	console.log('executing before each');
// 	done();
// });

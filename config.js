const port = process.env.PORT || 3000;
const mongodb = {
	host: process.env.MONGODB_HOST || 'localhost',
	port: process.env.MONGODB_PORT || 27017,
	db: 'test',
	user: process.env.MONGO_ID || '',// optional
	password: process.env.MONGO_PW || '', // optional
};
const mongoRoute = `mongodb://${mongodb.host}:${mongodb.port}/${mongodb.db}`
const mongoClusterRoute = `mongodb+srv://${mongoID}:${mongoPW}@cluster0-xzvas.mongodb.net/test?retryWrites=true&w=majority`;
const dbCacheLimit = 100;
const ttlSeconds = 3600;

module.exports = { port, dbRoute, dbCacheLimit, ttlSeconds, mongoRoute };

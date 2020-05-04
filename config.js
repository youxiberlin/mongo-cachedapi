const port = process.env.PORT || 3000;
const mongodb = {
	host: process.env.MONGODB_HOST || 'localhost',
	port: process.env.MONGODB_PORT || 27017,
	db: 'cacheapi',
	user: process.env.MONGO_ID || '',// optional
	password: process.env.MONGO_PW || '', // optional
};
const mongoRoute = `mongodb://${mongodb.host}:${mongodb.port}/${mongodb.db}`
const mongoClusterRoute = `mongodb+srv://${mongodb.user}:${mongodb.password}@cluster0-xzvas.mongodb.net/test?retryWrites=true&w=majority`;
const dbCacheLimit = 100;
const ttlSeconds = 3600;

module.exports = { port, dbCacheLimit, ttlSeconds, mongoRoute };

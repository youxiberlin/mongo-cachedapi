const port = process.env.PORT || 3000;
const mongoID = process.env.MONGO_ID || '';
const mongoPW = process.env.MONGO_PW || '';
const dbRoute = `mongodb+srv://${mongoID}:${mongoPW}@cluster0-xzvas.mongodb.net/test?retryWrites=true&w=majority`;
const dbCacheLimit = 100;
const ttlSeconds = 3600;

module.exports = { port, dbRoute, dbCacheLimit, ttlSeconds };

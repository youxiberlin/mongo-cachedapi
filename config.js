const port = process.env.PORT || 3000;
const mongoID = process.env.MONGO_ID || '';
const mongoPW = process.env.MONGO_PW || '';
const dbRoute = `mongodb+srv://${mongoID}:${mongoPW}@cluster0-xzvas.mongodb.net/test?retryWrites=true&w=majority`;

module.exports = { port, dbRoute };

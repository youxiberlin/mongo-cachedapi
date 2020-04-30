const port = process.env.PORT || 3000;
const mongoID = process.env.MONGO_ID || '';
const mongoPW = process.env.MONGO_PW || '';

module.exports = { port, mongoID, mongoPW };

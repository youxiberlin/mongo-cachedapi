const express = require('express');
const { getData, getAllData } = require('./controller');

const router = express.Router();


router.get('/', getAllData);
router.get('/:key', getData);

module.exports = router;

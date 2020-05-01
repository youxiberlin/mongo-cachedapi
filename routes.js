const express = require('express');
const { getData, getAllData, updateData } = require('./controller');

const router = express.Router();


router.get('/', getAllData);
router.get('/:key', getData);
router.put('/:key', updateData);

module.exports = router;

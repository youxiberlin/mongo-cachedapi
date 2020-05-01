const express = require('express');
const { getData, getAllData, updateData, deleteData, deleteAllData } = require('./controller');

const router = express.Router();


router.get('/', getAllData);
router.get('/:key', getData);
router.put('/:key', updateData);
router.delete('/:key', deleteData);
router.delete('', deleteAllData);

module.exports = router;

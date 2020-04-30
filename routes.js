const express = require('express');
const { getData } = require('./controller');

const router = express.Router();


router.get('/', (req, res) => res.send('hello from data'));
router.get('/:key', getData);

module.exports = router;

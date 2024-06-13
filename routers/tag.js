const express = require('express');
const router = express.Router();

const tagController = require('../controllers/tag.js')

router.get('/', tagController.index)

module.exports = router
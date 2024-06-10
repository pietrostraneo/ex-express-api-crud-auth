const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/user.js');

const validator = require('../middlewares/validator.js');
const { registerBody, loginBody } = require('../validations/user.js');

router.post('/sign-up', validator(registerBody), register);

router.post('/login', validator(loginBody), login);

module.exports = router
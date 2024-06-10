const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.js');
const validator = require('../middlewares/validator.js');
const { bodyData } = require('../validations/post.js');

const authenticate = require('../middlewares/authenticate.js');
const authorization = require('../middlewares/authorization.js');


router.get('/', postController.index);

router.get('/:slug', postController.show);

router.use(authenticate);


router.post('/', validator(bodyData), postController.store);

router.use(authorization);

router.put('/:slug', validator(bodyData), postController.update);

router.delete('/:slug', postController.destroy);

module.exports = router;
const express = require('express');
const controller = require('../controllers/ArticleController');

const router = express.Router();

router.get('/create', controller.create);
router.post('/', controller.post);

module.exports = router;

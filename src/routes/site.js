const express = require('express');
const controller = require('../controllers/SiteController');

const router = express.Router();

router.get('/search', controller.search);
router.get('/', controller.index);

module.exports = router;

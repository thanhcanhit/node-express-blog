const express = require('express');
const controller = require('../controllers/ArticleController');

const router = express.Router();

router.get('/create', controller.create);
router.get('/:slug', controller.get);
router.get('/:id/edit', controller.edit);
router.put('/:id', controller.update);
router.get('/', controller.getAll);
router.post('/', controller.post);

module.exports = router;

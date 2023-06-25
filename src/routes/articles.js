const express = require('express');
const controller = require('../controllers/ArticleController');

const router = express.Router();

router.get('/:id/edit', controller.edit);
router.patch('/:id/restore', controller.restore);
router.delete('/:id/force', controller.forceDelete);
router.get('/create', controller.create);
router.get('/trash', controller.trash);
router.get('/:slug', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/', controller.getAll);
router.post('/', controller.post);

module.exports = router;

const multer = require('multer');
const express = require('express');
const controller = require('../controllers/ArticleController');
const storage = require('../config/multer');

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/handle-form-actions', controller.handleFormAction);
router.get('/:id/edit', controller.edit);
router.patch('/:id/restore', controller.restore);
router.delete('/:id/force', controller.forceDelete);
router.get('/create', controller.create);
router.get('/trash', controller.trash);
router.get('/:slug', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/', controller.getAll);
router.post(
  '/',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'previewImgs', maxCount: 10 },
  ]),
  controller.post
);

module.exports = router;

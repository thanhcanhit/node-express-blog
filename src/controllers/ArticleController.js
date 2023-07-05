const Article = require('../models/Article');
const { mongooseArrayToObject } = require('../util/mongoose');

function splitTag(tagListString) {
  let result = tagListString.split(',');
  result = result.map((item) => item.trim());
  return result.filter((item) => item != '');
}

class ArticleController {
  // [GET] /articles/create
  create(req, res, next) {
    res.render('articles/create');
  }

  // [GET] /articles
  async getAll(req, res, next) {
    try {
      const articles = await Article.find({ deleted: false });
      const numTrash = await Article.count({ deleted: true });
      res.render('articles/articles', {
        articles: mongooseArrayToObject(articles),
        numTrash,
      });
    } catch (err) {
      next(err);
    }
  }

  // [GET] /articles/trash
  async trash(req, res, next) {
    try {
      const articles = await Article.find({ deleted: true });
      res.render('articles/articles-trash', {
        articles: mongooseArrayToObject(articles),
      });
    } catch (err) {
      next(err);
    }
  }

  // [GET] /articles/:slug
  async get(req, res, next) {
    try {
      const article = await Article.findOne({
        slug: req.params.slug,
        deleted: false,
      });
      res.render('articles/detail', {
        article: article.toObject(),
      });
    } catch (err) {
      next(err);
    }
  }

  // [GET] /articles/:id/edit
  async edit(req, res, next) {
    try {
      const article = await Article.findOne({
        _id: req.params.id,
        deleted: false,
      });
      res.render('articles/edit', {
        article: article.toObject(),
      });
    } catch (err) {
      next(err);
    }
  }

  // [PUT] /articles/:id
  async update(req, res, next) {
    try {
      const formValue = { ...req.body, tag: splitTag(req.body.tag) };

      await Article.updateOne(
        { _id: req.params.id, deleted: false },
        formValue
      );

      res.status(200).redirect('/articles/');
    } catch (err) {
      next(err);
    }
  }

  // [POST] /articles
  async post(req, res, next) {
    const avatar = '/uploads/' + req.files['avatar'][0].filename;
    const previewImgs = req.files['previewImgs'].map(
      (item) => '/uploads/' + item.filename
    );

    const formValue = {
      ...req.body,
      tag: splitTag(req.body.tag),
      imgPath: avatar,
      previewImgs: previewImgs,
    };

    const article = new Article(formValue);
    res.json(article);
    try {
      await article.save();
      res.status(200).redirect('back');
    } catch (err) {
      next(err);
    }
  }

  // [DELETE] /articles/:id
  async delete(req, res, next) {
    const articleId = req.params.id;
    try {
      await Article.updateOne(
        { _id: articleId, deleted: false },
        { deleted: true, deletedAt: Date.now() }
      );
      res.status(200).redirect('back');
    } catch (err) {
      next(err);
    }
  }

  // [DELETE] /articles/:id/force
  async forceDelete(req, res, next) {
    const articleId = req.params.id;
    try {
      await Article.deleteOne({ _id: articleId });
      res.status(200).redirect('back');
    } catch (err) {
      next(err);
    }
  }

  // [PATCH] /articles/:id/restore
  async restore(req, res, next) {
    const articleId = req.params.id;
    try {
      await Article.updateOne(
        { _id: articleId, deleted: true },
        { deleted: false, deletedAt: null }
      );
      res.status(200).redirect('back');
    } catch (err) {
      next(err);
    }
  }

  // [POST] /articles/handle-form-actions
  async handleFormAction(req, res, next) {
    const { action, articleIds } = req.body;
    switch (action) {
      case 'delete': {
        try {
          await Article.updateMany(
            { _id: { $in: articleIds } },
            { deleted: true, deletedAt: Date.now() }
          );
          res.status(200).redirect('back');
        } catch (err) {
          next(err);
        }
        break;
      }
      case 'restore': {
        try {
          await Article.updateMany(
            { _id: { $in: articleIds } },
            { deleted: false, deletedAt: null }
          );
          res.status(200).redirect('back');
        } catch (err) {
          next(err);
        }
        break;
      }

      case 'force-delete': {
        try {
          await Article.deleteMany({ _id: { $in: articleIds } });
          res.status(200).redirect('back');
        } catch (err) {
          next(err);
        }
        break;
      }

      default: {
        res.json({ message: 'invalid action' });
      }
    }
  }
}

module.exports = new ArticleController();

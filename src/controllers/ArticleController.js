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
    } catch (error) {}
  }

  // [GET] /articles/trash
  async trash(req, res, next) {
    try {
      const articles = await Article.find({ deleted: true });
      res.render('articles/articles-trash', {
        articles: mongooseArrayToObject(articles),
      });
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
  }

  // [POST] /articles
  async post(req, res, next) {
    const formValue = { ...req.body, tag: splitTag(req.body.tag) };

    const article = new Article(formValue);
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
}

module.exports = new ArticleController();

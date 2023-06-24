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
      const articles = await Article.find({});
      res.render('articles/articles', {
        articles: mongooseArrayToObject(articles),
      });
    } catch (error) {}
  }

  // [GET] /articles/:slug
  async get(req, res, next) {
    try {
      const article = await Article.findOne({ slug: req.params.slug });
      res.render('articles/detail', {
        article: article.toObject(),
      });
    } catch (error) {}
  }

  // [GET] /articles/:id/edit
  async edit(req, res, next) {
    try {
      const article = await Article.findOne({ _id: req.params.id });
      res.render('articles/edit', {
        article: article.toObject(),
      });
    } catch (error) {}
  }

  // [PUT] /articles/:id
  async update(req, res, next) {
    try {
      const formValue = { ...req.body, tag: splitTag(req.body.tag) };

      await Article.updateOne({ _id: req.params.id }, formValue);

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
}

module.exports = new ArticleController();

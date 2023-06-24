const Article = require('../models/Article');

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

  // [GET] /articles/:slug
  async get(req, res, next) {
    try {
      const article = await Article.findOne({ slug: req.params.slug });
      res.render('articles/detail', {
        article: article.toObject(),
      });
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

const Article = require('../models/Article');

function splitTag(tagListString) {
  const result = tagListString.split(',');
  return result.map((item) => item.trim());
}

class ArticleController {
  // [GET] /articles/create
  create(req, res, next) {
    res.render('articles/create');
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

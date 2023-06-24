const Article = require('../models/Article');
const { mongooseArrayToObject } = require('../util/mongoose');

class SiteController {
  // [GET] /
  async index(req, res, next) {
    try {
      const articles = await Article.find({});
      res.status(200).render('home', {
        articles: mongooseArrayToObject(articles),
      });
    } catch (err) {}
  }
}

module.exports = new SiteController();

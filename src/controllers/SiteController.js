const Article = require('../models/Article');
const { mongooseArrayToObject } = require('../util/mongoose');

class SiteController {
  // [GET] /
  async index(req, res, next) {
    try {
      const articles = await Article.find({ deleted: false });
      res.status(200).render('home', {
        articles: mongooseArrayToObject(articles),
      });
    } catch (err) {
      next(err);
    }
  }

  // [GET] /search
  async search(req, res, next) {
    const searchQuery = req.query.searchQuery;
    try {
      const articles = await Article.find({
        deleted: false,
        name: { $regex: searchQuery, $options: 'i' },
      });
      res.status(200).render('search', {
        articles: mongooseArrayToObject(articles),
        searchQuery,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new SiteController();

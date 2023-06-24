const articlesRouter = require('./articles');
const siteRouter = require('./site');

function router(app) {
  app.use('/articles', articlesRouter);
  app.use('/', siteRouter);
}

module.exports = router;

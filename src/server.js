const express = require('express');
const dotenv = require('dotenv');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');

const mongodb = require('./config/mongodb');
const router = require('./routes/');

const app = express();

// Environment variables
dotenv.config();

// Connect db
mongodb.connect();

// Method override
app.use(methodOverride('_method'));

// Serve static file
app.use(express.static(path.join(__dirname, 'public/')));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine
app.engine(
  'hbs',
  hbs.engine({
    extname: 'hbs',
    helpers: require('./config/handlebars-helper'),
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Router
router(app);

// Not found page
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Error handler middleware
app.use((err, req, res, next) => {
  switch (err.status) {
    case 404: {
      res.status(404).render('not-found', {
        layout: null,
      });
      break;
    }
    default: {
      res.status(err.status || 500).send({
        error: {
          status: err.status || 500,
          message: err.message || 'Internal Server Error',
        },
      });
    }
  }
});

app.listen(process.env.PORT, () =>
  console.log(`App listening at http://localhost:${process.env.PORT}`)
);

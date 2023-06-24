const express = require('express');
const dotenv = require('dotenv');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');

const router = require('./routes/');
const mongodb = require('./config/mongodb');

const app = express();

// Environment variables
dotenv.config();

// Connect db
mongodb.connect();

// Method override
app.use(methodOverride('_method'));

// Serve static file
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// View engine
app.engine('hbs', hbs.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Router
router(app);

app.listen(process.env.PORT, () =>
  console.log(`App listening at http://localhost:${process.env.PORT}`)
);

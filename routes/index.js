const express = require('express');const db = require('../data/db');const router = express.Router();

function getClothes() {
  return db.prepare('SELECT * FROM clothes').all();
}

/* GET home page. */
router.get('/', function(req, res, next) {
  const clothes = getClothes();
  res.render('index', { title: 'Express', clothes });
});

/* GET basket page. */
router.get('/basket', function(req, res, next) {
  res.render('basket', { title: 'Basket' });
});

/* GET favorites page. */
router.get('/favorites', function(req, res, next) {
  res.render('favorites', { title: 'Favorites' });
});

/* GET error page. */
router.get('/error', function(req, res, next) {
  res.render('error', { title: 'Error' });
});

/* GET index page. */
router.get('/index', function(req, res, next) {
  const clothes = getClothes();
  res.render('index', { title: 'Index', clothes });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET news page. */
router.get('/news', function(req, res, next) {
  res.render('news', { title: 'News' });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

/* GET search page. */
router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Search' });
});

/* GET new product page. */
router.get('/products/new', function(req, res, next) {
  res.render('products/new', { title: 'New Product' });
});

router.get('/products', function(req, res, next) {
  res.render('products', { title: 'Products' });
});

/* POST new product. */
router.post('/products/new', function(req, res, next) {
  var stmt = db.prepare(
    'INSERT INTO clothes (brand, model, color, description, price, image_url) VALUES (?, ?, ?, ?, ?, ?)'
  );
  stmt.run(
    req.body.brand,
    req.body.model,
    req.body.color,
    req.body.description,
    Number(req.body.price) || 0,
    req.body.image_url || ''
  );
  res.redirect('/');
});

/* GET Admin page. */
router.get('/admin', function(req, res, next) {
  res.render('admin/index', { title: 'Admin' });
});

module.exports = router;

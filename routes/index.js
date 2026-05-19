const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('../data/db');
const router = express.Router();

const imagesDir = path.join(__dirname, '..', 'public', 'stylesheets', 'Images');

const nameMap = {
  'FF_Svart_Hoodie': 'Svart Hoodie',
  'FF_Blå_Hoodie':   'Blå Hoodie',
  'FF_Grön_Hoodie':  'Grön Hoodie',
  'FF_Gul_Hoodie':   'Gul Hoodie',
  'FF_Blå_Piké':     'Blå Pikétröja',
  'FF_Grön_Piké':    'Grön Pikétröja',
  'FF_Gul_Piké':     'Gul Pikétröja',
  'FF_Svart_Piké':   'Svart Pikétröja',
  'FF_Neon_Kepa':    'Neon Kepa',
};

function getClothesFromImages() {
  const files = fs.readdirSync(imagesDir).filter(f =>
    /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f) && !f.toLowerCase().includes('hero')
  );
  return files.map(file => ({
    name: nameMap[path.basename(file, path.extname(file))] || path.basename(file, path.extname(file)),
    image: '/stylesheets/Images/' + file,
    price: 0
  }));
}

function getClothesFromDb() {
  const rows = db.prepare(
    'SELECT id, brand, model, color, description, price, image_url FROM clothes'
  ).all();
  return rows.map(row => ({
    id: row.id,
    name: `${row.brand} ${row.model}`.trim(),
    brand: row.brand,
    model: row.model,
    image: row.image_url ? (row.image_url.startsWith('/') ? row.image_url : '/stylesheets/Images/' + row.image_url) : '',
    price: row.price || 0,
    description: row.description,
    color: row.color
  }));
}

/* GET home page. */
router.get('/', function(req, res, next) {
  let clothes = getClothesFromDb();
  if (!clothes.length) {
    clothes = getClothesFromImages();
  }
  const spotDefs = [
    { keyword: 'hoodie', label: 'Hoodies' },
    { keyword: 'piké',   label: 'Pikétröjor' },
    { keyword: 'kepa',   label: 'Kepsar' },
  ];
  const spots = spotDefs
    .map(({ keyword, label }) => {
      const item = clothes.find(c => c.name.toLowerCase().includes(keyword));
      return item ? { ...item, name: label } : null;
    })
    .filter(Boolean);
  res.render('index', { title: 'Express', clothes, spots });
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
  const clothes = getClothesFromDb();
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

/* Get categories page. */
router.get('/categories/klader', function(req, res, next) {
res.render('categories/klader', { title: 'Kläder' });
});

module.exports = router;

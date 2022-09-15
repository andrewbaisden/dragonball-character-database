const express = require('express');

const app = express();
const cors = require('cors');

const shopController = require('./controllers/shop');

app.use(cors());

app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('index', { pageTitle: 'Homepage' });
});

app.get('/test', (req, res, next) => {
  res.render('test', { pageTitle: 'Test Page' });
});

app.get('/products', (req, res, next) => {
  const data = require('./data/products.json');
  res.json(data);
});

app.get('/:productId', shopController.getProduct);

app.use((req, res, next) => {
  res
    .status(404)
    .render('404', { pageTitle: '404: Page Not Found', path: null });
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);

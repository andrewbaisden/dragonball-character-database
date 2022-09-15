const path = require('path');
const express = require('express');

const app = express();
const cors = require('cors');

app.use(cors());

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index', {
    root: __dirname,
    pageTitle: 'Dragonball Z Fighter App',
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);

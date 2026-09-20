const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    pageTitle: 'Dragon Ball Character Database',
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);

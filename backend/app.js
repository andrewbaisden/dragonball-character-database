const express = require('express');
const cors = require('cors');
const charactersController = require('./controllers/characters');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({
    name: 'Dragon Ball Character Database API',
    endpoints: {
      characters: '/characters',
      character: '/:characterId',
    },
  });
});

app.get('/characters', charactersController.listCharacters);
app.get('/:characterId', charactersController.getCharacter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);

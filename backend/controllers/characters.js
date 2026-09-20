const Character = require('../models/character');

exports.listCharacters = (req, res) => {
  res.json(Character.getAll());
};

exports.getCharacter = (req, res) => {
  const character = Character.findByIdOrName(req.params.characterId);

  if (!character) {
    return res.status(404).json({ error: 'Character not found' });
  }

  res.json(character);
};

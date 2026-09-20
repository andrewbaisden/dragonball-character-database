const characters = require('../data/characters.json');

function normalize(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-');
}

function getAll() {
  return characters;
}

function findByIdOrName(query) {
  const needle = normalize(query);

  return characters.find(
    (character) =>
      normalize(character.id) === needle || normalize(character.name) === needle
  );
}

module.exports = {
  getAll,
  findByIdOrName,
};

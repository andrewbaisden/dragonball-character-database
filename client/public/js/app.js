const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const API_BASE = isLocal
  ? 'http://localhost:8080/'
  : 'https://dbz-database-backend.onrender.com/';

const FALLBACK_ROSTER = [
  { id: 'goku', name: 'Goku' },
  { id: 'vegeta', name: 'Vegeta' },
  { id: 'gohan', name: 'Gohan' },
  { id: 'trunks', name: 'Trunks' },
  { id: 'frieza', name: 'Frieza' },
  { id: 'cell', name: 'Cell' },
  { id: 'buu', name: 'Buu' },
  { id: 'beerus', name: 'Beerus' },
  { id: 'piccolo', name: 'Piccolo' },
  { id: 'gotenks', name: 'Gotenks' },
  { id: 'hit', name: 'Hit' },
  { id: 'krillin', name: 'Krillin' },
  { id: 'jiren', name: 'Jiren' },
  { id: 'tien', name: 'Tien' },
  { id: 'android-17', name: 'Android 17' },
  { id: 'android-18', name: 'Android 18' },
  { id: 'broly', name: 'Broly' },
  { id: 'vegito', name: 'Vegito' },
  { id: 'gogeta', name: 'Gogeta' },
  { id: 'goku-black', name: 'Goku Black' },
];

class UI {
  constructor() {
    this.profile = document.querySelector('.profile');
    this.roster = document.querySelector('.character-roster');
    this.searchInput = document.querySelector('.search-characters');
    this.alertHost = document.querySelector('.search-alert');
  }

  renderRoster(characters) {
    this.roster.innerHTML = characters
      .map(
        (character) => `
      <button type="button" class="character-chip" data-id="${character.id}">
        ${character.name}
      </button>
    `
      )
      .join('');
  }

  setActiveCharacter(id) {
    this.roster.querySelectorAll('.character-chip').forEach((chip) => {
      chip.classList.toggle('is-active', chip.dataset.id === id);
    });
  }

  showProfile(character) {
    const abilities = character.abilities
      .map((ability) => `<li>${ability}</li>`)
      .join('');

    this.profile.innerHTML = `
      <article class="character-card">
        <div class="character-card-media">
          <img src="${character.img}" alt="${character.name}" />
        </div>
        <div class="character-card-body">
          <p class="character-kicker">${character.race} / ${character.gender}</p>
          <h2>${character.name}</h2>
          <p class="character-bio">${character.bio}</p>
          <div class="character-stats-grid">
            <div>
              <span>Health</span>
              <strong>${character.health}</strong>
            </div>
            <div>
              <span>Attack</span>
              <strong>${character.attack}</strong>
            </div>
            <div>
              <span>Defense</span>
              <strong>${character.defense}</strong>
            </div>
            <div>
              <span>KI Restore</span>
              <strong>${character.kiRestoreSpeed}</strong>
            </div>
          </div>
          <h3>Special Abilities</h3>
          <ul class="character-abilities">${abilities}</ul>
        </div>
      </article>
    `;

    this.profile.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  showLoading() {
    this.profile.innerHTML = `
      <div class="profile-status">
        <span class="loader"></span>
        Loading character...
      </div>
    `;
  }

  showAlert(message) {
    this.clearAlert();
    const alert = document.createElement('p');
    alert.className = 'alert';
    alert.textContent = message;
    this.alertHost.appendChild(alert);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    this.alertHost.innerHTML = '';
  }

  clearProfile() {
    this.profile.innerHTML = '';
  }
}

const ui = new UI();

let activeRequest = null;
let searchTimer = null;

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-');
}

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal });
  const text = await response.text();

  if (!text) {
    const error = new Error('Empty response');
    error.status = response.status;
    throw error;
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    const parseError = new Error('Invalid JSON response');
    parseError.status = response.status;
    throw parseError;
  }

  if (!response.ok) {
    const error = new Error(data.error || 'Request failed');
    error.status = response.status;
    throw error;
  }

  return data;
}

async function getCharacter(query) {
  const slug = slugify(query);

  if (!slug) {
    ui.clearProfile();
    ui.setActiveCharacter('');
    return;
  }

  if (activeRequest) {
    activeRequest.abort();
  }

  activeRequest = new AbortController();
  ui.clearAlert();
  ui.showLoading();
  ui.setActiveCharacter(slug);

  try {
    const character = await fetchJson(
      `${API_BASE}${encodeURIComponent(slug)}`,
      activeRequest.signal
    );
    ui.showProfile(character);
    ui.setActiveCharacter(character.id);
  } catch (error) {
    if (error.name === 'AbortError') {
      return;
    }

    ui.clearProfile();
    ui.setActiveCharacter('');

    if (error.status === 404) {
      ui.showAlert('Character not found');
      return;
    }

    ui.showAlert('Unable to load character. Check that the API is running.');
  }
}

function searchFromInput(value) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    getCharacter(value);
  }, 350);
}

async function loadRoster() {
  try {
    const characters = await fetchJson(`${API_BASE}characters`);
    ui.renderRoster(characters);
  } catch (error) {
    ui.renderRoster(FALLBACK_ROSTER);
  }
}

ui.searchInput.addEventListener('input', (event) => {
  const value = event.target.value.trim();

  if (!value) {
    clearTimeout(searchTimer);
    ui.clearProfile();
    ui.clearAlert();
    ui.setActiveCharacter('');
    return;
  }

  searchFromInput(value);
});

document.querySelector('.dragonball-character').addEventListener('submit', (event) => {
  event.preventDefault();
  getCharacter(ui.searchInput.value);
});

ui.roster.addEventListener('click', (event) => {
  const chip = event.target.closest('.character-chip');

  if (!chip) {
    return;
  }

  ui.searchInput.value = chip.textContent.trim();
  getCharacter(chip.dataset.id);
});

loadRoster();

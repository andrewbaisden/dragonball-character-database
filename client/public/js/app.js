console.log('Dragonball Z Fighter App');

class UI {
  constructor() {
    this.profile = document.querySelector('.profile');
  }

  // Display profile in the ui
  showProfile(user) {
    // console.log('The character object', user);

    // Loop over the character abilities, and output in a li tag
    const abilities = user.abilities.map((ab) => ab);
    let specials = '';
    abilities.forEach((element) => {
      specials += `
       <li>${element}</li>
       `;
    });

    this.profile.innerHTML = `
    <div class="character-profile">
    <h1>${user.name}</h1>
  
    <img src=${user.img} />
    <p class="character-gender"><b>Gender:</b> ${user.gender}</p>
    <p class="character-race"><b>Race:</b> ${user.race}</p>
    </div>
    
    <div class="character-stats">
    <div class="character-bio">
    <p>${user.bio}</p>
    </div>
    <div class="character-stats-abilities">
    <div class="character-stats">
    <h2>Stats</h2>
        <ul>
            <li>Health: ${user.health}</li>
            <li>Attack: ${user.attack}</li>
            <li>Defense: ${user.defense}</li>
            <li>KI Restore Speed: ${user.kiRestoreSpeed}</li>
        </ul>
    </div>
    <div class="character-abilities">
    <h2>Special Abilites</h2>
    <ul>
        ${specials}
    </ul>
    </div>
</div>
    `;
  }

  // Show alert message
  ShowAlert(message, className) {
    // Clear any remaining alerts
    this.clearAlert();
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.searchContainer');
    // Get search box
    const search = document.querySelector('.search');
    // Insert alert
    container.insertBefore(div, search);

    // Timeout after 3 sec
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  // Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  // Clear profile
  clearProfile() {
    this.profile.innerHTML = '';
  }
}

// init UI
const ui = new UI();

async function getUser(user) {
  // const localAPI = 'http://localhost:3000/';
  const onlineAPI = 'https://dbz-database-backend.onrender.com/';
  const profileResponse = await fetch(`${onlineAPI}${user}`);

  const profile = await profileResponse.json().then((data) => {
    if (JSON.stringify(data) === '{}') {
      // Show alert
      console.log('No Character Found');
      ui.ShowAlert('Character not found', 'alert');
    } else {
      ui.showProfile(data);
    }
  });

  return {
    profile,
  };
}

// Search input
const searchUser = document.querySelector('.search-characters');

// Search input event listener
searchUser.addEventListener('keyup', (e) => {
  // Get input text
  const userText = e.target.value;
  const userTextLowerCase = userText.toLowerCase();
  // console.log(userTextLowerCase);

  if (userTextLowerCase !== '') {
    // Make http call
    getUser(userTextLowerCase);
  } else {
    // Clear Profile
    ui.clearProfile();
  }
});

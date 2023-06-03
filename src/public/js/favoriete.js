async function fetchCosmeticsByIds(ids) {
  const url = `https://fortnite-api.com/v2/cosmetics/br/search/ids?id=${ids.join('&id=')}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchCosmeticsById(id) {
  const url = `https://fortnite-api.com/v2/cosmetics/br/search?id=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
}

async function generateCards(ids) {
  let html = '';
  const data = await fetchCosmeticsByIds(ids);
  for (let i = 0; i < data.data.length; i++) {
    const cosmetic = data.data[i];
    html += `
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${cosmetic.images.icon}" alt="${cosmetic.name}" />
        <div class="card-body">
          <button type="button" class="btn btn-primary modal-button" data-toggle="modal" data-target="#myModal" data-fortnite-character-id="${cosmetic.id}">
            Meer Info
          </button>
        </div>
      </div>
    `;
  }
  return html;
}

const avatarSelectContainer = document.getElementById('favorite-select-container');
const favoriteIds = [];

Array.from(avatarSelectContainer.children).forEach((child) => {
  const fortniteCharacterId = child.getAttribute('data-fortnite-character-id');
  favoriteIds.push(fortniteCharacterId);
});

(async () => {
  const avatarCards = await generateCards(favoriteIds);
  const avatarContainer = document.getElementById('favorite-select-container');
  avatarContainer.innerHTML = avatarCards;

  reinjectModal();
})();


async function modelOpen(btn, { modelTitle, modelBody, modelFooter }) {

  // Omdat we de ID in de html hebben gezet als 'data-fortnite-character-id' kunnen we deze nu ophalen met de getAttribute functie
  // Nu kunnen we deze ID gebruiken om de juiste data op te halen uit de database of de API
  // Hier is een link van waar we de ID hebben opgeslagen: https://github.com/Copystrike/AP-bottomdown/blob/14d142618e6aacfe8f6f77e3d9272811c5ad2d22/src/pages/avatar.ejs#L21
  const fortniteCharacterId = btn.getAttribute("data-fortnite-character-id");

  const character = await fetchCosmeticsById([fortniteCharacterId]);

  modelTitle.innerHTML = `<h2>${character.name}</h2>`;

  modelBody.innerHTML = `
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <p><strong>Description:</strong> ${character.description}</p>
          <p><strong>Type:</strong> ${character.type.value}</p>
          <p><strong>Rarity:</strong> ${character.rarity.value}</p>
          <p><strong>Added:</strong> ${new Date(character.added).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p><strong>Notes</strong></p>
          <ul id="notes-list"></ul>
          <form id="add-note-form">
            <div class="form-group">
              <label for="note-text">Add a note:</label>
              <input type="text" class="form-control" id="note-text" required>
            </div>
            <button type="submit" class="btn btn-primary mt-2">Add</button>
          </form>
        </div>
      </div>
    </div>
`;

  modelFooter.innerHTML = `
  <button type="button" onclick="addWin('${character.id}')" class="btn btn-success">WIN</button>
  <button type="button" onclick="addLoss('${character.id}')" class="btn btn-danger">LOSE</button>
  <button type="button" onclick="removeFavorite('${character.id}')" class="btn btn-danger">verwijder</button>
  <button type="button" class="btn btn-secondary modal-close" data-dismiss="modal">Close</button>
  `;


  injectAddFormNote(fortniteCharacterId);
}

function addWin(fortniteCharacterId) {
  fetch("/api/win", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fortniteCharacterId,
    }),
  });
}

function addLoss(fortniteCharacterId) {
  fetch("/api/loss", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fortniteCharacterId,
    }),
  });
}

function removeFavorite(fortniteCharacterId) {
  fetch(`/api/favorite/${fortniteCharacterId}`, {
    method: "DELETE",
  }).then(() => {
    location.reload();
  });
}


async function injectAddFormNote(fortniteCharacterId) {
  const form = document.getElementById('add-note-form');
  const input = document.getElementById('note-text');

  form.addEventListener('submit', event => {
    event.preventDefault();
    const text = input.value.trim();
    if (text) {
      addNoteToDatabase({ text }, fortniteCharacterId).then(note => {
        addNoteToList(note.data);
        input.value = '';
      });
    }
  });

  fetch(`/api/notes/${fortniteCharacterId}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((note) => {
        addNoteToList(note);
      });
    });
}

function addNoteToList(note) {
  const list = document.getElementById('notes-list');
  const listItem = document.createElement('li');
  listItem.setAttribute('data-id', note._id);
  listItem.innerHTML = `
    <span>${note.text}</span>
    <button class="btn btn-danger btn-sm ml-2">Delete</button>
  `;
  listItem.querySelector('button').addEventListener('click', () => {
    const noteId = listItem.getAttribute('data-id');
    // Do something with the note ID, such as delete it from the database
    listItem.remove();
  });
  list.appendChild(listItem);
}

async function addNoteToDatabase(note, fortniteCharacterId) {
  // Code to add the note to the database
  // For example, using fetch to make a POST request to a server
  const response = await fetch(`/api/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fortniteCharacterId,
      text: note.text
    })
  });
  const data = await response.json();
  return data;
}

async function removeNoteFromDatabase(noteId) {
  // Code to remove the note from the database
  // For example, using fetch to make a DELETE request to a server
  const response = await fetch(`/api/notes/${noteId}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  return data;
}
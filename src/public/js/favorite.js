async function fetchCosmeticsByIds(ids) {
  const url = `https://fortnite-api.com/v2/cosmetics/br/search/ids?id=${ids.join("&id=")}`;
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
  let html = "";
  const data = await fetchCosmeticsByIds(ids);
  for (let i = 0; i < data.data.length; i++) {
    const cosmetic = data.data[i];
    html += `
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${cosmetic.images.icon}" alt="${cosmetic.name}" />
        <div class="card-body">
          <h5 class="card-title text-center text-light">${cosmetic.name}</h5>
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-primary modal-button" data-toggle="modal" data-target="#myModal" data-fortnite-character-id="${cosmetic.id}">
            Meer Info
          </button>
        </div>
      </div>
    `;
  }
  return html;
}

const avatarSelectContainer = document.getElementById("favorite-select-container");
const favoriteIds = [];

Array.from(avatarSelectContainer.children).forEach((child) => {
  const fortniteCharacterId = child.getAttribute("data-fortnite-character-id");
  favoriteIds.push(fortniteCharacterId);
});

(async () => {
  const avatarCards = await generateCards(favoriteIds);
  const avatarContainer = document.getElementById("favorite-select-container");
  avatarContainer.innerHTML = avatarCards;

  reinjectModal();
})();

async function modelOpen(btn, { modelTitle, modelBody, modelFooter }) {
  // Omdat we de ID in de html hebben gezet als 'data-fortnite-character-id' kunnen we deze nu ophalen met de getAttribute functie
  // Nu kunnen we deze ID gebruiken om de juiste data op te halen uit de database of de API
  // Hier is een link van waar we de ID hebben opgeslagen: https://github.com/Copystrike/AP-bottomdown/blob/14d142618e6aacfe8f6f77e3d9272811c5ad2d22/src/pages/avatar.ejs#L21
  const fortniteCharacterId = btn.getAttribute("data-fortnite-character-id");

  const character = await fetchCosmeticsById(fortniteCharacterId);
  const stats = await fetchStatsById(fortniteCharacterId);
  const notes = await fetchNotesById(fortniteCharacterId);
  modelTitle.innerHTML = `<h2>${character.name}</h2>`;

  const defaultPickaxe = "/assets/question-mark.jpg";
  modelBody.innerHTML = `
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <p><span class="fw-bold">Beschrijving:</span> ${character.description}</p>
        <p><span class="fw-bold">Zeldzaamheid:</span> ${character.rarity.value}</p>
        <p><span class="fw-bold">Aangemaakt:</span> ${new Date(character.added).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        <p><span class="fw-bold">Statistieken:</span></p>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Gewonnen</th>
              <th scope="col">Verloren</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="character-wins">${stats.wins || 0}</td>
              <td id="character-losses">${stats.losses || 0}</td>
            </tr>
          </tbody>
        </table>
        <table class="table">
          <thead>
            <tr>
              <th colspan="2" scope="col">Note</th>
            </tr>
          </thead>
          <tbody id="notes-list">
          </tbody>
        </table>
        <form id="add-note-form">
          <div class="mb-3">
            <label for="note-text" class="form-label fw-bold">Voeg een notitie toe:</label>
            <input type="text" class="form-control" id="note-text" required>
          </div>
          <button type="submit" class="btn btn-primary mt-2">Toevoegen</button>
        </form>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <p class="fw-bold">Gekoppelde items</p>
        <div id="gekoppelde-item" class="d-flex justify-content-evenly">
          <img data-slot="1" src="${defaultPickaxe}" alt="Image 1" height="150">
          <img data-slot="2" src="${defaultPickaxe}" alt="Image 2" height="150">
        </div>
      </div>
    </div>
  </div>
  `;

  modelFooter.innerHTML = `
  <button type="button" onclick="addWin('${character.id}')" class="btn btn-success">Win</button>
  <button type="button" onclick="addLoss('${character.id}')" class="btn btn-danger">Verlies</button>
  <button type="button" onclick="removeFavorite('${character.id}')" class="btn btn-danger">Verwijderen</button>
  <button type="button" class="btn btn-secondary modal-close" data-dismiss="modal">Sluit</button>
  `;

  injectAddFormNote(fortniteCharacterId);
  injectGekoppeldeItems(fortniteCharacterId);

  notes.forEach((note) => {
    addNoteToList(note);
  });
}

function blacklistHandle() {
  location.reload();
}

function delayButtons() {
  document.querySelectorAll("#modal-footer button:not(.modal-close)").forEach((button) => {
    button.disabled = true; // disable the button
    setTimeout(() => {
      button.disabled = false; // re-enable the button after 2 seconds
    }, 500);
  });
}


function addWin(fortniteCharacterId) {
  delayButtons();
  fetch("/api/stats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fortniteCharacterId,
      stat: "wins",
      type: "increment",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.isBlacklisted) blacklistHandle();
      document.getElementById("character-wins").innerText = data.data.wins;
    });
}

function addLoss(fortniteCharacterId) {
  delayButtons();
  fetch("/api/stats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fortniteCharacterId,
      stat: "loss",
      type: "increment",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.isBlacklisted) blacklistHandle();
      document.getElementById("character-losses").innerText = data.data.losses;
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
  const form = document.getElementById("add-note-form");
  const input = document.getElementById("note-text");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (text) {
      addNoteToDatabase({ text }, fortniteCharacterId).then((note) => {
        addNoteToList(note.data);
        input.value = "";
      });
    }
  });
}

function addNoteToList(note) {
  const list = document.getElementById("notes-list");
  const noteRow = document.createElement("tr");
  noteRow.classList.add("note");
  noteRow.setAttribute("data-id", note._id);
  noteRow.insertAdjacentHTML(
    "beforeend",
    `
    <td style="max-width: 300px; word-wrap: break-word;">${note.text}</td>
    <td><button class="btn btn-danger btn-sm">Delete</button></td>
  `
  );
  noteRow.querySelector("button").addEventListener("click", () => {
    const noteId = noteRow.getAttribute("data-id");
    removeNoteFromDatabase(noteId).then(() => {
      noteRow.remove();
    });
  });
  list.appendChild(noteRow);
}

async function addNoteToDatabase(note, fortniteCharacterId) {
  // Code to add the note to the database
  // For example, using fetch to make a POST request to a server
  const response = await fetch(`/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fortniteCharacterId,
      text: note.text,
    }),
  });
  const data = await response.json();
  return data;
}

async function removeNoteFromDatabase(noteId) {
  // Code to remove the note from the database
  // For example, using fetch to make a DELETE request to a server
  const response = await fetch(`/api/notes/${noteId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}

// fetch fortnite character stats /api/stats
async function fetchStatsById(fortniteCharacterId) {
  const response = await fetch(`/api/stats/${fortniteCharacterId}`);
  const data = await response.json();
  return data;
}

async function fetchNotesById(fortniteCharacterId) {
  const response = await fetch(`/api/notes/${fortniteCharacterId}`);
  const data = await response.json();
  return data;
}

async function injectGekoppeldeItems(fortniteCharacterId) {
  const pickaxes = await fetchPickaxes(); // pickaxes.data[0].images.icon
  const gekoppeldeItemContainer = document.getElementById("gekoppelde-item");

  await fetch(`/api/linkedItem/${fortniteCharacterId}`)
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((item) => {
        const slot = item.slot;
        const image = pickaxes.data.find((pickaxe) => pickaxe.id === item.item_id).images.icon;
        gekoppeldeItemContainer.querySelector(`[data-slot="${slot}"]`).setAttribute("src", image);
      });
    });

  gekoppeldeItemContainer.addEventListener("click", createPopup.bind(null, "Items", pickaxes, fortniteCharacterId));
}

async function popupImageClicked(element, pickaxe, fortniteCharacterId) {
  const slot = element.getAttribute("data-slot");

  fetch(`/api/linkedItem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fortniteCharacterId: fortniteCharacterId,
      item_id: pickaxe.id,
      slot: slot,
    }),
  });
}

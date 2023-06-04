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
  modelTitle.innerHTML = `<h2>${character.name}</h2>`;

  modelBody.innerHTML = `
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <p><span class="fw-bold">Description:</span> ${character.description}</p>
        <p><span class="fw-bold">Rarity:</span> ${character.rarity.value}</p>
        <p><span class="fw-bold">Added:</span> ${new Date(character.added).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        <p><span class="fw-bold">Stats:</span></p>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Wins</th>
              <th scope="col">losses</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="character-wins">${stats.wins || 0}</td>
              <td id="character-losses">${stats.losses || 0}</td>
            </tr>
          </tbody>
        </table>
        <p><span class="fw-bold">Blacklist Reason:</span></p>
        <input type="text" id="blacklist-reason" value="">
      </div>
  </div>
  `;

  modelFooter.innerHTML = `
  <button type="button" onclick="deleteBlacklist('${character.id}')" class="btn btn-danger">Unblacklist</button>
  <button type="button" onclick="updateBlacklistReason('${fortniteCharacterId}')" class="btn btn-primary">Update Blacklist Reason</button>
  <button type="button" class="btn btn-secondary modal-close" data-dismiss="modal">Close</button>
  `;


  await injectBlacklistReason(fortniteCharacterId);
}

async function updateBlacklistReason(fortniteCharacterId) {
  const blacklistReason = document.getElementById("blacklist-reason").value;
  await fetch(`/api/blacklist`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: fortniteCharacterId,
      reason: blacklistReason,
    }),
  });
}

async function deleteBlacklist(fortniteCharacterId) {
  await fetch(`/api/blacklist/${fortniteCharacterId}`, {
    method: "DELETE",
  }).then((response) => response.json()).then((data) => {
    if (data.success) {
      window.location.reload();
    }
  });
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

// Blacklist inject function
async function injectBlacklistReason(fortniteCharacterId) {
  const blacklistFetch = await fetch(`/api/blacklist/${fortniteCharacterId}`).then((res) => res.json());
  const blacklistReason = blacklistFetch.reason;
  const blacklistReasonInput = document.getElementById("blacklist-reason");
  blacklistReasonInput.value = blacklistReason ? blacklistReason : "";
}
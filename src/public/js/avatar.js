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
        <p><span class="fw-bold">Blacklist reden:</span></p>
        <input type="text" id="blacklist-reason" value="">
      </div>
  </div>
  `;
  modelFooter.innerHTML = `
  <button type="button" onclick="favoriteAvatar('${fortniteCharacterId}')" class="btn btn-warning">Favoriet</button>
  <button type="button" onclick="updateBlacklistReason('${fortniteCharacterId}')" class="btn btn-danger">Blacklist</button>
  <button type="button" onclick="updateAvatar('${fortniteCharacterId}')" class="btn btn-primary">Zet als Avatar</button>
  <button type="button" class="btn btn-secondary modal-close" data-dismiss="modal">Sluit</button>
  `;


  await injectBlacklistReason(fortniteCharacterId);
}

async function updateAvatar(fortniteCharacterId) {
  await fetch("/api/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fortniteCharacterId,
    }),
  }).then(setAvatar(fortniteCharacterId))
}





async function favoriteAvatar(fortniteCharacterId) {
  await fetch("/api/favorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fortniteCharacterId,
    }),
  });
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

async function fetchCosmeticsById(id) {
  const url = `https://fortnite-api.com/v2/cosmetics/br/search?id=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
}


// fetch fortnite character stats /api/stats
async function fetchStatsById(fortniteCharacterId) {
  const response = await fetch(`/api/stats/${fortniteCharacterId}`);
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
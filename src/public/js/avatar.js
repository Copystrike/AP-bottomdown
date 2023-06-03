function setAvatar(avatarUrl) {
  const avatar = document.createElement("img");
  avatar.src = avatarUrl;
  const avatarContainer = document.getElementById("avatar-container");
  avatarContainer.innerHTML = "";
  avatarContainer.appendChild(avatar);
}

function modelOpen(btn, { modelTitle, modelBody, modelFooter }) {

  // Omdat we de ID in de html hebben gezet als 'data-fortnite-character-id' kunnen we deze nu ophalen met de getAttribute functie
  // Nu kunnen we deze ID gebruiken om de juiste data op te halen uit de database of de API
  // Hier is een link van waar we de ID hebben opgeslagen: https://github.com/Copystrike/AP-bottomdown/blob/14d142618e6aacfe8f6f77e3d9272811c5ad2d22/src/pages/avatar.ejs#L21
  const fortniteCharacterId = btn.getAttribute("data-fortnite-character-id");

  modelTitle.innerHTML = `Hey`;
  // headerFooter.innerHTML = "Footer";

  modelBody.innerHTML = `
    <p>Character ID: ${fortniteCharacterId}</p>
    `;

  modelFooter.innerHTML = `
  <button type="button" onclick="favoriteAvatar('${fortniteCharacterId}')" class="btn btn-warning">Favorite Avatar</button>
  <button type="button" class="btn btn-secondary modal-close" data-dismiss="modal">Close</button>
  `;

}

function modelClose() {
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

function setAvatar(avatarUrl) {
  const avatar = document.createElement("img");
  avatar.src = avatarUrl;
  const avatarContainer = document.getElementById("avatar-container");
  avatarContainer.innerHTML = "";
  avatarContainer.appendChild(avatar);
}
const filePath = 'fortnite-items.json';

function getNameById(filePath, desiredId) {
  try {
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const foundObject = jsonData.find(obj => obj.id === desiredId);

    if (foundObject) {
      return foundObject.name;
    }
    else {
      return null;
    }
  } catch (error) {
    console.log("Error Json File");
    return null;
  }
}

// axios.get<FortniteItem>(FORTNITE_API_URL).then((axiosResponse) => {


function modelOpen(btn, { modelTitle, modelBody, modelFooter }) {

  // Omdat we de ID in de html hebben gezet als 'data-fortnite-character-id' kunnen we deze nu ophalen met de getAttribute functie
  // Nu kunnen we deze ID gebruiken om de juiste data op te halen uit de database of de API
  // Hier is een link van waar we de ID hebben opgeslagen: https://github.com/Copystrike/AP-bottomdown/blob/14d142618e6aacfe8f6f77e3d9272811c5ad2d22/src/pages/avatar.ejs#L21
  const fortniteCharacterId = btn.getAttribute("data-fortnite-character-id");

  const headerTitle = modelTitle.querySelector("h5");
  const headerFooter = modelFooter.querySelector("h3");

  fetch($`https://fortnite-api.com/v2/cosmetics/br/`)
  headerTitle.innerHTML = ``;
  // headerFooter.innerHTML = "Footer";

  modelBody.innerHTML = `
    <p>Fortnite Character ID: ${fortniteCharacterId}</p>
    
    `;


}
console.log(getNameById(filePath, "11dabeb6-dc77-45e9-8467-25ebede8478c"));

function modelClose() {
  console.log("model gesloten");
}

// remove cookie
function removeCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    removeCookie("session");
    window.location.href = "/";
  });
}


async function setAvatar(fortniteCharacterId) {
  let avatarUrl;
  if (fortniteCharacterId) {
    const character = await fetchCosmeticsById(fortniteCharacterId);
    avatarUrl = character.images.icon;
  } else {
    avatarUrl = "/assets/question-mark.jpg";
  }

  const avatar = document.createElement("img");
  avatar.src = avatarUrl;
  const avatarContainer = document.getElementById("avatar-container");
  avatarContainer.innerHTML = "";
  avatarContainer.appendChild(avatar);
}

(async () => {
  const response = await fetch("/api/user");
  if (!response.ok) {
    return;
  }
  const { fortnite_id } = await response.json();
  await setAvatar(fortnite_id);
})();
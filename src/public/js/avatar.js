function setAvatar(avatarUrl) {
  const avatar = document.createElement("img");
  avatar.src = avatarUrl;
  const avatarContainer = document.getElementById("avatar-container");
  avatarContainer.innerHTML = "";
  avatarContainer.appendChild(avatar);
}

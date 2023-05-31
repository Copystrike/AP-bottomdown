// remove cookie
function removeCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

document.getElementById("logout-button").addEventListener("click", function () {
  removeCookie("session");
  window.location.href = "/";
});

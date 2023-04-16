var modal = document.getElementById("modal");

var avatarButtons = document.getElementsByClassName("modal-btn");

var closeModal = document.getElementsByClassName("modal-close")[0];

Array.from(avatarButtons).forEach((btn) => {
  btn.onclick = function () {
    modal.style.display = "block";
  };
});

closeModal.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

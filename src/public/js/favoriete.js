<<<<<<< HEAD
=======


>>>>>>> avatar
const popup = document.getElementById("popup");
function openPopup() {
  popup.classList.add("open-popup");
}
function closePopup() {
  popup.classList.remove("open-popup");
<<<<<<< HEAD
}

const button = document.getElementById("win"),
  count = 0;
  
=======
};
const button = document.getElementById("win"),
  count = 0;
>>>>>>> avatar
button.onclick = function () {
  count += 1;
  button.innerHTML = "Wins: " + count;
};
const button1 = document.getElementById("lose"),
  counter = 0;
<<<<<<< HEAD

=======
>>>>>>> avatar
button1.onclick = function () {
  counter += 1;
  button1.innerHTML = "Loss: " + count;
};

var button = document.getElementById("btn btn-secondary"),
  count = 0;
button.onclick = function() {
  count += 1;
  button.innerHTML = "Wins: " + count;
};
var button = document.getElementById("btn btn-danger"),
  count = 0;
button.onclick = function() {
  count += 1;
  button.innerHTML = "Loss: " + count;
};
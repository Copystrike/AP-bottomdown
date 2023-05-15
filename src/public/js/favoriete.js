var button = document.getElementById("win"),
  count = 0;
button.onclick = function() {
  count += 1;
  button.innerHTML = "Wins: " + count;
};
var button1 = document.getElementById("lose"),
  counter = 0;
button1.onclick = function() {
  counter += 1;
  button1.innerHTML = "Loss: " + count;
};
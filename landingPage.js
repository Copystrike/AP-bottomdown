// create a button element
const button = document.createElement("button");

// set the button text
button.textContent = "Click me!";

// add an event listener to the button
button.addEventListener("click", () => {
  console.log("Button clicked!");
});

// append the button to the HTML body
document.body.appendChild(button);

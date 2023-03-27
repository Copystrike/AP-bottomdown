const scrollContainer = document.querySelector(".games");

scrollContainer.addEventListener("mousemove", (event) => {
  const scrollSpeed = 60;
  const edgeOfContainer = 0.5;
  // If the mouse is on the left half of the screen, the direction will be -1 (left), otherwise 1 (right)
  const direction = event.clientX < window.innerWidth / 2 ? -1 : 1;

  // if clientX is less than 10% of the window width, then we are on the left edge
  const isRightEdge = event.clientX > window.innerWidth * edgeOfContainer;
  // if clientX is greater than 90% of the window width, then we are on the right edge
  const isLeftEdge = event.clientX < window.innerWidth * (1 - edgeOfContainer);

  if (isRightEdge || isLeftEdge) {
    scrollContainer.scrollLeft += direction * scrollSpeed;
  }
});

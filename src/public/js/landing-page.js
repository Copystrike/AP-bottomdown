const scrollContainer = document.querySelector('.games');

scrollContainer.addEventListener('mousemove', (event) => {
  

  const scrollSpeed = 20;
  const direction = event.clientX < window.innerWidth / 2 ? -1 : 1;

  if (event.clientX < window.innerWidth * 0.1 || event.clientX > window.innerWidth * 0.9) {

    scrollContainer.scrollLeft += direction * scrollSpeed;
  }
  

  

});

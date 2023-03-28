const scrollContainer = document.querySelector('.games');

scrollContainer.addEventListener('mousemove', (event) => {
  

  const scrollSpeed = 50;
  const direction = event.clientX < window.innerWidth / 2 ? -1 : 1;

  if (event.clientX < window.innerWidth * 0.1 || event.clientX > window.innerWidth * 0.9) {

    scrollContainer.scrollLeft += direction * scrollSpeed;
  }
  
});



// Login gedeelte, moet sowiso nog uitgewerkt worden

let loggedIn = false;

function checkIfLoggedIn(page) {

  if (loggedIn == false) {
    openForm();
  }
  else if (loggedIn == true) {
    if (page == "nogame") {
      window.location.href = "./nogame";
    }
  
    else if (page == "fortnite") {
      window.location.href = "./avatar";
    }
  }
  
}

function openForm() {
  document.getElementById("loginForm").style.display = "block";
}

function closeForm() {
  document.getElementById("loginForm").style.display = "none";
}


// Dit moet nog verder uitgewerkt worden
function checkCredentials() {
  loggedIn = true;
  document.getElementById("loginForm").style.display = "none";
}
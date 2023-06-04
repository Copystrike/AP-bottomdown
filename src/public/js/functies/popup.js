function createPopup(title, pickaxes, fortniteCharacterId, event) {
  const clickedImage = event.target;
  const popupContainer = createPopupContainer();
  const popupHeader = createPopupHeader(title);
  popupContainer.appendChild(popupHeader);
  const popupBody = createPopupBody(pickaxes, clickedImage, popupContainer, fortniteCharacterId);
  popupContainer.appendChild(popupBody);
  document.body.appendChild(popupContainer);

  // Add event listener to close popup when clicked outside of it
  popupContainer.addEventListener("click", (event) => {
    if (event.target === popupContainer) {
      popupContainer.remove();
    }
  });
}

function createPopupContainer() {
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container", "position-fixed", "top-0", "start-0", "w-100", "h-100", "d-flex", "flex-column", "justify-content-center", "align-items-center");
  popupContainer.style.zIndex = "9999"; // Set a high z-index
  popupContainer.style.boxShadow = "0px 0px 10px 0px rgba(0,0,0,0.75)"; // Add shadow to popup container
  return popupContainer;
}

function createPopupHeader(title) {
  const popupHeader = document.createElement("div");
  popupHeader.classList.add("popup-header", "p-3", "rounded", "d-flex", "justify-content-center", "align-items-center");
  popupHeader.style.backgroundRepeat = "no-repeat"; // Prevent background image from repeating
  popupHeader.style.backgroundSize = "contain"; // Scale background image to fit container
  popupHeader.style.backgroundColor = "#1c2b36"; // Change background color of popup header to match Fortnite's UI
  const popupTitle = document.createElement("h2");
  popupTitle.textContent = title;
  popupTitle.style.color = "#fff"; // Change font color of popup title
  popupTitle.style.fontFamily = "Burbank Big Condensed Bold"; // Change font family of popup title
  popupHeader.appendChild(popupTitle);
  return popupHeader;
}

function createPopupBody(pickaxes, clickedImage, popupContainer, fortniteCharacterId) {
  const popupBody = document.createElement("div");
  popupBody.classList.add("popup-body", "p-3", "rounded", "d-flex", "justify-content-center", "align-items-center", "flex-wrap");
  popupBody.style.width = "500px"; // Set a fixed width
  popupBody.style.height = "200px"; // Set a fixed height
  popupBody.style.backgroundColor = "#1c2b36"; // Change background color of popup body to match Fortnite's UI
  popupBody.style.border = "2px solid #b3c7f9"; // Add border to popup body
  pickaxes.data.forEach((pickaxe) => {
    const popupImage = createPopupImage(pickaxe, clickedImage, popupContainer, fortniteCharacterId);
    popupBody.appendChild(popupImage);
  });
  return popupBody;
}

function createPopupImage(pickaxe, clickedImage, popupContainer, fortniteCharacterId) {
  const imageUrl = pickaxe.images.icon;

  const popupImage = document.createElement("img");
  popupImage.src = imageUrl;
  popupImage.alt = "Pickaxe Image";
  popupImage.classList.add("popup-image", "m-2");
  popupImage.setAttribute("data-fortnite-id", pickaxe.id);
  popupImage.style.width = "50px"; // Set a fixed width for the images
  popupImage.style.height = "50px"; // Set a fixed height for the images

  popupImage.addEventListener("click", async () => {
    clickedImage.src = imageUrl;
    popupContainer.remove();
    await popupImageClicked(clickedImage, pickaxe, fortniteCharacterId);
  });
  return popupImage;
}

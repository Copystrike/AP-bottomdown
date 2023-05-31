window.onload = function () {
  injectModal();
};

function injectModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    document.getElementById("modal").outerHTML = `
          <div id="modal" class="modal">
            <div class="modal-content">
              <div class="modal-header">
                <span class="modal-close">&times;</span>
                <h2>Loading...</h2>
              </div>
              <div class="modal-body">
                <p>Loading...</p>
              </div>
              <div class="modal-footer">
                <h3>Loading...</h3>
              </div>
            </div>
          </div>
      `;
    loadModel();
  }
}

function loadModel() {
  var modal = document.getElementById("modal");
  var modalButtons = document.getElementsByClassName("btn btn-secondary");
  var closeModal = document.getElementsByClassName("modal-close")[0];

  const modelTitle = document.getElementsByClassName("modal-header")[0];
  const modelBody = document.getElementsByClassName("modal-body")[0];
  const modelFooter = document.getElementsByClassName("modal-footer")[0];

  const onModelOpen = (button) => {
    modal.style.display = "block";
    // Zal 'modelOpen' function uitvoeren, zorg er voor dat deze function bestaat op jouw pagina
    // Deze functie zal ook de data van de button meesturen en model elementen zo dat je deze kan aanpassen
    modelOpen(button, { modelTitle, modelBody, modelFooter });
  };

  const onModelClose = () => {
    modal.style.display = "none";
    modelClose(); // Zal deze function uitvoeren, zorg er voor dat deze function bestaat op de jouw pagina
  };

  Array.from(modalButtons).forEach((button) => (button.onclick = () => onModelOpen(button)));

  closeModal.onclick = () => onModelClose();

  window.onclick = function (event) {
    if (event.target == modal) {
      onModelClose();
    }
  };
}

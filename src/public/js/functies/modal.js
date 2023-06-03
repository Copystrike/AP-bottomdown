window.onload = function () {
  injectModal();
};

function injectModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    document.getElementById("modal").outerHTML = `
      <div class="modal" id="modal" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div id="modal-header" class="modal-header">
              <h5 class="modal-title" id="modal-title">Loading...</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div id="modal-body" class="modal-body">
              <p>loading...</p>
            </div>
            <div id="modal-footer" class="modal-footer" />
          </div>
        </div>
      </div>
        `;
    loadModel();
  }
}

function loadModel() {
  const modal = document.getElementById("modal");

  const modelTitle = document.getElementById("modal-header");
  const modelBody = document.getElementById("modal-body");
  const modelFooter = document.getElementById("modal-footer");

  const onModelOpen = async (button) => {

    // Zal 'modelOpen' function uitvoeren, zorg er voor dat deze function bestaat op jouw pagina
    // Deze functie zal ook de data van de button meesturen en model elementen zo dat je deze kan aanpassen
    if (typeof modelOpen === "function") {
      await modelOpen(button, { modelTitle, modelBody, modelFooter });
    }

    // Als de modal open is zal hij modal close buttons attachen aan de modal.
    const closeModelButtons = document.getElementsByClassName("modal-close"); // Pakt de buttons met de class 'modal-close' op de pagina
    Array.from(closeModelButtons).forEach((button) => (button.onclick = () => onModelClose()));


    modal.style.display = "block";
  };

  const onModelClose = () => {
    modal.style.display = "none";
    if (typeof modelClose === "function") modelClose(); // Zal deze function uitvoeren, zorg er voor dat deze function bestaat op de jouw pagina
  };

  let modalButtons = document.getElementsByClassName("modal-button"); // Pakt de buttons met de class 'modal-button' op de pagina
  Array.from(modalButtons).forEach((button) => (button.onclick = async () => onModelOpen(button)));

  window.onclick = function (event) {
    if (event.target == modal) {
      onModelClose();
    }
  };
}

function unloadModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    let modalButtons = document.getElementsByClassName("modal-button");
    Array.from(modalButtons).forEach((button) => (button.onclick = null));

    window.onclick = null;
  }
}

function reinjectModal() {
  unloadModal();
  loadModel()
}

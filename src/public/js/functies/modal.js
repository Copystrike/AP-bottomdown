window.onload = function () {
    injectModal();
  };
  
  function injectModal() {
    const modal = document.getElementById("modal");
    if (modal) {
      document.getElementById("modal").outerHTML = `
      <div class="modal" id="modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div id="modal-header">
              <h5 class="modal-title">Loading...</h5>
              <button type="button" class="modal-close" data-dismiss="modal">&times;</button>
            </div>
            <div id="modal-body">
              <p>loading...</p>
            </div>
            <div id="modal-footer" />
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
  
    let modalButtons = document.getElementsByClassName("modal-button"); // Pakt de buttons met de class 'modal-button' op de pagina
    Array.from(modalButtons).forEach((button) => (button.onclick = () => onModelOpen(button)));
  
    const closeModelButtons = document.getElementsByClassName("modal-close"); // Pakt de buttons met de class 'modal-close' op de pagina
    Array.from(closeModelButtons).forEach((button) => (button.onclick = () => onModelClose()));
      
    window.onclick = function (event) {
      if (event.target == modal) {
        onModelClose();
      }
    };
  }
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
            <div class="modal-header">
              <h5 class="modal-title">Loading...</h5>
              <button type="button" class="modal-close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <p>loading...</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary close" data-dismiss="modal">Close</button>
              <button onclick="setAvatar('<%= items[i].item.images.icon %>')">Set <%= items[i].item.name %> as Avatar</button>
            </div>
          </div>
        </div>
      </div>
        `;
      loadModel();
    }
  }
  
  function loadModel() {
    var modalButtons = document.getElementsByClassName("modal-button");


    var modal = document.getElementById("modal");
    var closeModal = document.getElementsByClassName("close")[0];
    var closeModal2 = document.getElementsByClassName("modal-close")[0];
  
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
    closeModal2.onclick = () => onModelClose();
  
    window.onclick = function (event) {
      if (event.target == modal) {
        onModelClose();
      }
    };
  }
function openModal(id) {
    document.getElementById(id).style.display = "flex";
    document.body.style.overflow = "hidden";
  }

function closeModal(id) {
    document.getElementById(id).style.display = "none";
    document.body.style.overflow = "auto";
  }

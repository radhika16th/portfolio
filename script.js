let activeModal = null;

function openModal(id) {
activeModal = document.getElementById(id);
activeModal.classList.add("active");
document.body.style.overflow = "hidden";
}

function closeModal(id) {
const modal = document.getElementById(id);
modal.classList.remove("active");
document.body.style.overflow = "auto";
activeModal = null;
}

// ESC key support
document.addEventListener("keydown", (e) => {
if (e.key === "Escape" && activeModal) {
    activeModal.classList.remove("active");
    document.body.style.overflow = "auto";
    activeModal = null;
}
});

// Click outside modal content to close
document.querySelectorAll(".modal").forEach(modal => {
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
    activeModal = null;
    }
});
});

function openModal(id) {
const modal = document.getElementById(id);
const body = modal.querySelector(".modal-body");

modal.classList.add("active");
document.body.style.overflow = "hidden";

body.classList.add("loading");

setTimeout(() => {
    body.classList.remove("loading");
}, 400); // subtle, fast
}

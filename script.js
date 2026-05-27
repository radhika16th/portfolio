// toggle dark and light modes
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");

  function setTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  window.toggleTheme = function () {
    const isDark = !document.body.classList.contains("dark");
    setTheme(isDark);
  };

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") === "dark";
  setTheme(savedTheme);
});

// the card button clicks
let activeModal = null;

function openModal(id) {
  const modal = document.getElementById(id);
  const body = modal.querySelector(".modal-body");

  activeModal = modal;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  body.classList.add("loading");
  setTimeout(() => {
    body.classList.remove("loading");
  }, 400);
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
  activeModal = null;
}

// ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && activeModal) {
    activeModal.classList.remove("active");
    document.body.style.overflow = "auto";
    activeModal = null;
  }
});

// Click outside
document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
      activeModal = null;
    }
  });
});
 
// Experience Tabs
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".exp-panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.target).classList.add("active");
  });
});

// Moblie navbar
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Images for projects
function openLightbox(img) {
  const lightbox = document.getElementById("imageLightbox");
  const lightboxImg = document.getElementById("lightboxImage");

  lightboxImg.src = img.src;
  lightbox.classList.add("active");
}

function closeLightbox() {
  document.getElementById("imageLightbox").classList.remove("active");
}

// Awards
const track = document.getElementById("awardsTrack");

let offset = 0;
let paused = false;
let rafId;

const SPEED = 0.4;
const CARD_WIDTH = 260 + 24;
const PAUSE_TIME = 3000;

// clone cards once
function setupInfiniteAwards() {
  const cards = [...track.children];
  cards.forEach(card => track.appendChild(card.cloneNode(true)));
}

function normalizeOffset() {
  const half = track.scrollWidth / 2;

  if (offset <= -half) {
    offset += half;
  } else if (offset >= 0) {
    offset -= half;
  }
}

// animation loop
function animate() {
  if (!paused) {
    offset -= SPEED;

    const half = track.scrollWidth / 2;
    normalizeOffset();
    track.style.transform = `translateX(${offset}px)`;
  }

  rafId = requestAnimationFrame(animate);
}

// arrow controls
function scrollAwards(direction) {
  paused = true;

  offset -= direction * CARD_WIDTH;
  normalizeOffset();
  track.style.transform = `translateX(${offset}px)`;

  clearTimeout(track.resumeTimer);
  track.resumeTimer = setTimeout(() => {
    paused = false;
  }, PAUSE_TIME);
}

track.addEventListener("mouseenter", () => paused = true);
track.addEventListener("mouseleave", () => paused = false);

window.addEventListener("load", () => {
  setupInfiniteAwards();
  animate();
});

// contact email copy
function copyEmail(button) {
  navigator.clipboard.writeText("radhika16th@gmail.com");

  const text = button.querySelector(".copy-text");

  text.textContent = "✓ Copied!";

  setTimeout(() => {
    text.textContent = "✉ radhika16th@gmail.com";
  }, 2000);
}
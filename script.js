// JavaScript to toggle the navigation menu visibility on smaller screens
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
}

//Slider for container DnevnaDoza

let currentIndex = 0;

function slide(direction) {
  const sliderInner = document.getElementById("slider-inner");
  const cards = document.querySelectorAll(".card");
  const cardWidth = cards[0].offsetWidth + 20; // Card width + margin
  const sliderWidth = sliderInner.offsetWidth;
  const totalWidth = cards.length * cardWidth;

  // Calculate the new index
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex * cardWidth + sliderWidth > totalWidth) currentIndex--;

  // Center the cards during scrolling
  const offset = currentIndex * cardWidth - (sliderWidth - cardWidth) / 2;
  sliderInner.style.transform = `translateX(${-Math.max(0, offset)}px)`;

  // Update navigation button visibility
  updateNavButtons();
}

function updateNavButtons() {
  const sliderInner = document.getElementById("slider-inner");
  const cards = document.querySelectorAll(".card");
  const cardWidth = cards[0].offsetWidth + 20;
  const totalWidth = cards.length * cardWidth;
  const visibleWidth = sliderInner.offsetWidth;

  // Hide buttons if scrolling isn't needed
  document.querySelector(".nav-btn.left").style.display =
    currentIndex === 0 ? "none" : "block";
  document.querySelector(".nav-btn.right").style.display =
    currentIndex * cardWidth + visibleWidth >= totalWidth ? "none" : "block";
}

let startX = 0;
let endX = 0;

function handleTouchStart(event) {
  startX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  endX = event.touches[0].clientX;
}

function handleTouchEnd() {
  const direction = startX - endX > 0 ? 1 : -1; // Swipe direction
  if (Math.abs(startX - endX) > 50) slide(direction); // Threshold
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider-inner");
  slider.addEventListener("touchstart", handleTouchStart, { passive: true });
  slider.addEventListener("touchmove", handleTouchMove, { passive: true });
  slider.addEventListener("touchend", handleTouchEnd);

  updateNavButtons(); // Initialize button visibility
});

//END of slider container DnevnaDoza

/*
// Animation for the midtext spans
const midtextSpans = document.querySelectorAll(".midtext span");
let colorIndex = 0;

const colors = [
  "orange",
  "green",
  "pink",
  "red",
  "brown",
  "purple",
  "blue",
  "yellow",
];

// Function to animate spans with movement and circular rotation
function animateMidtextSpans() {
  midtextSpans.forEach((span, index) => {
    // Change color periodically
    setInterval(() => {
      span.style.color = colors[colorIndex];
      colorIndex = (colorIndex + 1) % colors.length;
    }, 1000); // Change color every 1 second
  });
}

// Trigger the animation when the page is loaded
window.onload = () => {
  animateMidtextSpans();
};

/*
// JavaScript to toggle the navigation menu visibility on smaller screens
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
}

// Animation for the midtext spans
const midtextSpans = document.querySelectorAll(".midtext span");
let colorIndex = 0;

const colors = [
  "orange",
  "green",
  "pink",
  "red",
  "brown",
  "purple",
  "blue",
  "yellow",
];

// Function to animate spans with movement and circular rotation
function animateMidtextSpans() {
  midtextSpans.forEach((span, index) => {
    // Add circular movement and horizontal transition
    span.style.animation = `moveAndSpin 4s infinite ease-in-out ${index * 2}s`;

    // Change color periodically
    setInterval(() => {
      span.style.color = colors[colorIndex];
      colorIndex = (colorIndex + 1) % colors.length;
    }, 2000); // Change color every 1 second
  });
}

// Trigger the animation when the page is loaded
window.onload = () => {
  animateMidtextSpans();
};
*/

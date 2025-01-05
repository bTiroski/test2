// JavaScript to toggle the navigation menu visibility on smaller screens
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
}

// Slider for container DnevnaDoza
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

  const leftButton = document.querySelector(".nav-btn.left");
  const rightButton = document.querySelector(".nav-btn.right");

  // Hide buttons if scrolling isn't needed or if screen size is small
  if (window.matchMedia("(max-width: 768px)").matches) {
    leftButton.style.display = "none";
    rightButton.style.display = "none";
  } else {
    leftButton.style.display = currentIndex === 0 ? "none" : "block";
    rightButton.style.display =
      currentIndex * cardWidth + visibleWidth >= totalWidth ? "none" : "block";
  }
}

// Touch events for swipe gestures
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

  // Add touch event listeners for mobile swipe
  slider.addEventListener("touchstart", handleTouchStart, { passive: true });
  slider.addEventListener("touchmove", handleTouchMove, { passive: true });
  slider.addEventListener("touchend", handleTouchEnd);

  // Initialize button visibility
  updateNavButtons();

  // Recalculate button visibility on window resize
  window.addEventListener("resize", updateNavButtons);
});

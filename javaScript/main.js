// Dropdown on click
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector(".search");
  const bagBtn = document.querySelector(".bag");
  const searchDropdown = document.getElementById("search-dropdown");
  const bagDropdown = document.getElementById("bag-dropdown");

  searchBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      searchDropdown.classList.toggle("active");
      bagDropdown.classList.remove("active");
  });

  bagBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      bagDropdown.classList.toggle("active");
      searchDropdown.classList.remove("active");
  });

  document.addEventListener("click", () => {
      searchDropdown.classList.remove("active");
      bagDropdown.classList.remove("active");
  });
});

// LOGO loading section
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero-title");
  const darPart = document.getElementById("dar");
  const ialPart = document.getElementById("ial");
  const revealText = document.querySelector(".reveal-text");
  const heroSubtext = document.querySelector(".hero-subtext");

  // Trigger the title animation after 0.5s
  setTimeout(() => {
      heroTitle.classList.add("active");
      darPart.classList.add("active");
      ialPart.classList.add("active");

      // Trigger the subtext fade-in after the title animation completes (1s delay)
      setTimeout(() => {
          heroSubtext.classList.add("active");
      }, 1000); // Adjust delay to sync with title animation

      // Trigger the reveal text animation after 1.5s delay
      setTimeout(() => {
          revealText.classList.add("active");
      }, 1500);
  }, 500); // Start the "DARiAL" animation after 0.5s
});

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const panes = document.querySelectorAll(".tab-pane");

  tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
          // Remove active class from all tabs and panes
          tabs.forEach((t) => t.classList.remove("active"));
          panes.forEach((pane) => pane.classList.remove("active"));

          // Add active class to clicked tab and its corresponding pane
          tab.classList.add("active");
          const targetPane = document.getElementById(tab.dataset.tab);
          targetPane.classList.add("active");
      });
  });
});

// Get references to carousel elements
const track = document.querySelector('.carousel-track');
let slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn--right');
const prevButton = document.querySelector('.carousel-btn--left');
const dotsNav = document.querySelector('.carousel-nav');
let dots = Array.from(dotsNav.children);

// Clone first and last slides for infinite looping
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[slides.length - 1].cloneNode(true);

// Append and prepend clones
track.appendChild(firstSlideClone);
track.insertBefore(lastSlideClone, slides[0]);

// Update slides array after cloning
slides = Array.from(track.children);

// Set initial index (accounting for the prepended clone)
let currentSlideIndex = 1;

// Set track position to show the first real slide
const slideWidth = slides[currentSlideIndex].getBoundingClientRect().width;
track.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;

// Function to update dot indicators (we have 4 real slides)
function updateDots() {
let realIndex = currentSlideIndex - 1;
if (realIndex < 0) {
  realIndex = slides.length - 3;
}
if (realIndex >= slides.length - 2) {
  realIndex = 0;
}
dots.forEach((dot, index) => {
  dot.classList.toggle('current', index === realIndex);
});
}

// Function to move to a slide with smooth transition
function moveToSlide(index) {
const slideWidth = slides[index].getBoundingClientRect().width;
track.style.transition = 'transform 0.5s ease';
track.style.transform = `translateX(-${slideWidth * index}px)`;
currentSlideIndex = index;
}

// When transition ends, check if we're at a clone and jump without animation
track.addEventListener('transitionend', () => {
if (slides[currentSlideIndex].classList.contains('clone')) {
  track.style.transition = 'none';
  if (currentSlideIndex === 0) {
    currentSlideIndex = slides.length - 2;
  } else if (currentSlideIndex === slides.length - 1) {
    currentSlideIndex = 1;
  }
  const slideWidth = slides[currentSlideIndex].getBoundingClientRect().width;
  track.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;
}
updateDots();
});

// Next Button
nextButton.addEventListener('click', () => {
moveToSlide(currentSlideIndex + 1);
});

// Previous Button
prevButton.addEventListener('click', () => {
moveToSlide(currentSlideIndex - 1);
});

// Dot navigation (only for real slides)
dots.forEach((dot, index) => {
dot.addEventListener('click', () => {
  moveToSlide(index + 1);
});
});

// Mark clones for easier detection
firstSlideClone.classList.add('clone');
lastSlideClone.classList.add('clone');

// Update carousel on window resize
window.addEventListener('resize', () => {
const slideWidth = slides[currentSlideIndex].getBoundingClientRect().width;
track.style.transition = 'none';
track.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;
});

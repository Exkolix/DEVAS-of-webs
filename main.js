// Get the navbar element
const navFilters = document.querySelector('.nav-filters');

// Listen for scroll events
window.addEventListener('scroll', () => {
    // Check if the page has scrolled past a certain point (e.g., 100px)
    if (window.scrollY > 86) {
        // Add the 'sticky' class to make the navbar fixed
        navFilters.classList.add('sticky');
    } else {
        // Remove the 'sticky' class when scroll is above 100px
        navFilters.classList.remove('sticky');
    }
});

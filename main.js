
const navFilters = document.querySelector('.nav-filters');

// Listen for scroll events
window.addEventListener('scroll', () => {
    if (window.scrollY > 86) {
        navFilters.classList.add('sticky');
    } else {
        navFilters.classList.remove('sticky');
    }
});

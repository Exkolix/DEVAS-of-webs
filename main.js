const navFilters = document.querySelector('.nav-filters');

window.addEventListener('scroll', () => {
    if (window.scrollY > 86) {
        navFilters.classList.add('sticky');
    } else {
        navFilters.classList.remove('sticky');
    }
});

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

    setTimeout(() => {
        heroTitle.classList.add("active");
        darPart.classList.add("active");
        ialPart.classList.add("active");
    }, 500); // Adjust delay for when the animation starts
});


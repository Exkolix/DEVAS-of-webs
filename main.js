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
        }, 1500); // Adjust delay to allow title to fully animate
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

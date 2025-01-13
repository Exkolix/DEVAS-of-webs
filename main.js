window.onscroll = function() { stickyNavbar() };

var navbar = document.querySelector(".nav-filters");
var sticky = navbar.offsetTop;

function stickyNavbar() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky");  // Add sticky class when scrolling down
  } else {
    navbar.classList.remove("sticky");  // Remove sticky class when at the top
  }
}

const q = document.querySelector.bind(document);

// Get the navbar
const navbar = document.querySelectorAll("nav");
const indecator = document.querySelectorAll(".js-navbar-indecator");

// nav
navbar.forEach(function (nav) {
  nav.addEventListener("click", function (evt) {
    if (evt.target.nodeName === "A") {
      animate(evt.target);
      goTo(evt.target);
    }
  });
});
// seating width and potsion for the active tab
const setActiveLink = () => {
  let activeLink = document.querySelectorAll(".nav_activeLink");
  indecator.forEach(function (link, i) {
    link.style.width = `${activeLink[i].scrollWidth}px`;
    link.style.transform = `translateX(${activeLink[i].offsetLeft}px)`;
  });
};
// animating the indecator after clicking on the tab and seeting the active tab link
const animate = (elm) => {
  let linkWidth = elm.scrollWidth;
  let linkOffest = elm.offsetLeft;
  let parentNav = elm.closest("nav");
  let oldActivetab = parentNav.querySelector(".nav_activeLink");
  let childIndecator = parentNav.querySelector(".js-navbar-indecator");
  childIndecator.style.width = `${linkWidth}px`;
  childIndecator.style.transform = `translateX(${linkOffest}px)`;
  oldActivetab.classList.remove("nav_activeLink");
  elm.classList.add("nav_activeLink");
};
// Go To targeting Section
const goTo = (elm) => {
  let parentNav = elm.closest("nav");
  let parentNavAttr = parentNav.getAttribute("data-navContainer");
  let sectionContainer = document.getElementById(parentNavAttr);
  let targetSec = elm.getAttribute("data-Id");
  let oldActiveSection = sectionContainer.querySelector(
    ".section-content.active"
  );

  let activeSection = sectionContainer.querySelector("#" + targetSec);
  oldActiveSection.classList.remove("active");
  activeSection.classList.add("active");
  scrollTo(activeSection);
};

const scrollTo = (elm) => {
  window.scrollTo({
    top: elm.offsetTop - 48,
    behavior: "smooth",
  });
};
setActiveLink();

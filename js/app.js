const q = document.querySelector.bind(document);

const navbar = document.querySelectorAll("nav");
const indecator = document.querySelectorAll(".js-navbar-indecator");
const sections = document.querySelectorAll(".section-content");
const stickyNav = document.querySelector(".js-stickyNav");
let sectionsContent = [];
let navLinks = "";
// getting sections content


const PrepareDom = () => {
  sections.forEach(function (sec) {
    const obj = {
      title: sec.querySelector(".section-content_heading h3").textContent,
      id: sec.id
    }
    sectionsContent.push(obj)
  });
  
  sectionsContent.forEach(function (item) {
    const link = `<a class="topNav_link" href="javascript:;" data-Id="${item.id}">${item.title}</a>`
    navLinks += link 
  });
  stickyNav.innerHTML = navLinks + '<span class="navbar-indecator js-navbar-indecator"></span>';
  navbar.forEach(function (nav) {
    nav.addEventListener("click", function (evt) {
      if (evt.target.nodeName === "A") {
        // animate(evt.target);
        goTo(evt.target);
      }
    });
  });
};

// seating width and potsion for the active tab
// const setActiveLink = () => {
//   let activeLink = document.querySelectorAll(".nav_activeLink");
//   indecator.forEach(function (link, i) {
//     link.style.width = `${activeLink[i].scrollWidth}px`;
//     link.style.transform = `translateX(${activeLink[i].offsetLeft}px)`;
//   });
// };
// animating the indecator after clicking on the tab and seeting the active tab link
const animate = (elm) => {
  let linkWidth = elm.scrollWidth;
  let linkOffest = elm.offsetLeft;
  let parentNav = elm.closest("nav");
  let oldActivetab = parentNav.querySelector(".nav_activeLink");
  let childIndecator = parentNav.querySelector(".js-navbar-indecator");
  childIndecator.style.width = `${linkWidth}px`;
  childIndecator.style.transform = `translateX(${linkOffest}px)`;
  if(oldActivetab != null){
    oldActivetab.classList.remove("nav_activeLink");
  }
  
  elm.classList.add("nav_activeLink");
};
// Go To targeting Section
const goTo = (elm) => {
  let parentNav = elm.closest("nav");
  let parentNavAttr = parentNav.getAttribute("data-navContainer");
  let sectionContainer = document.getElementById(parentNavAttr);
  let targetSec = elm.getAttribute("data-Id");
  let oldActiveSection = sectionContainer.querySelector(
    ".section-content"
  );

  let activeSection = sectionContainer.querySelector("#" + targetSec);
  if (oldActiveSection.classList.contains("active")) {
    oldActiveSection.classList.remove("active");
  }
  activeSection.classList.add("active");
  scrollTo(activeSection);
};

const scrollTo = (elm) => {
  window.scrollTo({
    top: elm.offsetTop - 48,
    behavior: "smooth",
  });
};


const targets = document.querySelectorAll(".section-content");

// Next we want to create a function that will be called when that element is intersected
function handleIntersection(entries) {
  // The callback will return an array of entries, even if you are only observing a single item
  entries.map((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      let targetID = entry.target.id;
      let targetNavElm = document.querySelectorAll(`[data-Id=${targetID}]`)
      animate(targetNavElm[0])
    } else {
      entry.target.classList.remove("active");
    }
  });
}

// Next we instantiate the observer with the function we created above. This takes an optional configuration
// object that we will use in the other examples.
const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.7,
});

// Finally start observing the target element
targets.forEach((target) => observer.observe(target));

PrepareDom();
// setActiveLink();
"use strict";

const backdrop = document.querySelector(".backdrop");
const modalImg = document.querySelector(".modal__img");
const license1BigImg = document.querySelector(".modal__license1");
const license2BigImg = document.querySelector(".modal__license2");
const containerLicenses = document.querySelector(".container__licenses");
const closeModalBtn = document.querySelector("close__modal__btn");

const navBar = document.querySelector(".nav");

const allSections = document.querySelectorAll("section");

const telOnNavBar = document.querySelector(".nav__telephone");

const allNavLinks = document.querySelectorAll(".nav__link");

const lazyImages = document.querySelectorAll("img[data-src]");
//modal licence
const navLinksContainer = document.querySelector(".nav__links");

const closeAllModalDisplay = function () {
  backdrop.style.display = "none";
  license1BigImg.style.display = "none";
  license2BigImg.style.display = "none";
  modalImg.style.display = "none";
};

containerLicenses.addEventListener("click", (e) => {
  backdrop.style.display = "block";
  modalImg.style.display = "block";

  if (e.target.id === "license--1") {
    license1BigImg.style.display = "flex";
  }
  if (e.target.id === "license--2") {
    license2BigImg.style.display = "flex";
  }
});

backdrop.addEventListener("click", () => {
  closeAllModalDisplay();
});

modalImg.addEventListener("click", (e) => {
  const windowOuterWidth = window.outerWidth;
  if (
    e.target.classList.contains("modal__img__decreased") &&
    windowOuterWidth > 1400
  ) {
    e.target.classList.toggle("modal__img__full");
  }
  if (e.target.classList.contains("close__modal__btn")) {
    closeAllModalDisplay();
  }
});

//smooth scroll
let menuIsOpen = false;

navBar.addEventListener("click", function (e) {
  e.preventDefault();

  const changeClassesSmallMenu = () => {
    allNavLinks.forEach((el) => {
      if (
        el.classList.contains("nav__menu__btn") ||
        el.classList.contains("nav__telephone")
      ) {
        return;
      }
      el.classList.toggle("menu__small__screen");
    });
    menuIsOpen = !menuIsOpen;
  };

  if (e.target.classList.contains("nav__menu__btn")) {
    if (!menuIsOpen) {
      changeClassesSmallMenu();
      return;
    }
    if (menuIsOpen) {
      changeClassesSmallMenu();
      return;
    }
  }

  if (
    e.target.classList.contains("nav__link") &&
    !e.target.classList.contains("nav__telephone")
  ) {
    const href = document.querySelector(e.target.getAttribute("href"));
    href?.scrollIntoView({ behavior: "smooth" });

    if (menuIsOpen) {
      changeClassesSmallMenu();
    }
    return;
  }
});

//sections up

const appearanceSection = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  if (entry.target.id == "section--2") {
    telOnNavBar.classList.add("nav__telephone__attention");
    const timer = setTimeout(() => {
      telOnNavBar.classList.remove("nav__telephone__attention");
      clearTimeout(timer);
    }, 1000);
  }
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(appearanceSection, {
  root: null,
  threshold: 0,
});

if (window.scrollY === 0) {
  allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
  });
}

// lazy loading

const loadImages = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const lazyImagesObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0,
});
lazyImages.forEach((image) => lazyImagesObserver.observe(image));

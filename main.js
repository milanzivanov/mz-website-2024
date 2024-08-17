import "./scss/main.scss";

const swiper = new Swiper(".swiper-container", {
  slidesPerView: 1,
  autoHeight: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  breakpoints: {
    769: {}
  }
});

// static audio url
import audioLightOnUrl from "./audio/light-on.mp3";
import audioLightOffUrl from "./audio/light-off.mp3";
document.querySelector(".theme-audio--light-on").src = audioLightOnUrl;
document.querySelector(".theme-audio--light-off").src = audioLightOffUrl;

///////////////////
// dark light theme
const themeBtn = document.querySelector(".theme");

function getCurrentTheme() {
  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  localStorage.getItem("canabrey.theme")
    ? (theme = localStorage.getItem("canabrey.theme"))
    : null;
  return theme;
}

function loadTheme(theme) {
  const root = document.querySelector(":root");
  if (theme === "light") {
    themeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="bkg2--stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  } else {
    themeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="bkg2--stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  }
  root.setAttribute("color-scheme", `${theme}`);
}

themeBtn.addEventListener("click", () => {
  let theme = getCurrentTheme();
  let audio;
  if (theme === "dark") {
    audio = document.querySelector(".theme-audio--light-on");
    theme = "light";
  } else {
    audio = document.querySelector(".theme-audio--light-off");
    theme = "dark";
  }
  audio.currentTime = 0;
  audio.play();
  localStorage.setItem("canabrey.theme", `${theme}`);
  loadTheme(theme);
});

window.addEventListener("DOMContentLoaded", () => {
  loadTheme(getCurrentTheme());
});

////////////
// mobile menu
let toggleBtn = document.querySelector(".nav-toggle-btn");
let backdrop = document.querySelector(".nav-backdrop-container");

toggleBtn.addEventListener("click", function () {
  toggleBtn.classList.add("active");
  backdrop.classList.add("active");
});

backdrop.addEventListener("click", function () {
  toggleBtn.classList.remove("active");
  backdrop.classList.remove("active");
});

///////////////
/// btt new
document.addEventListener("scroll", handleScroll);
// get a reference to the button
let scrollToTopBtn = document.querySelector(".back-to-top-container__btn");
let showFire = document.querySelector(".show-fire");

function handleScroll() {
  let scrolableHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let GOLDEN_RATIO = 0.09;

  if (document.documentElement.scrollTop / scrolableHeight > GOLDEN_RATIO) {
    scrollToTopBtn.style.display = "flex";
  } else {
    scrollToTopBtn.style.display = "none";
    showFire.classList.remove("show");
  }
}

scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
  // show rocket fire
  showFire.classList.add("show");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/////////////////////////////
// Scroll to section with event delagation better approach
document
  .querySelector(".nav-desktop__list")
  .addEventListener("click", function (e) {
    // e.preventDefault();

    // Matching strategy
    if (e.target.classList.contains("nav-desktop__link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });

/////////////////////////////////
// Remove active state from mobile menu with key escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document
      .querySelector(".nav-backdrop-container")
      .classList.remove("active");
    document.querySelector(".nav-toggle-btn").classList.remove("active");
  }
});

//////////////////////
// StickyNav
const header = document.querySelector(".header");
const main = document.querySelector("main");
// const headerHeight = header.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0
  // rootMargin: `-${headerHeight}px`
});

headerObserver.observe(main);

////////////////////////
// Nav link effect
const nav = document.querySelector(".nav-desktop");

const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav-desktop__link")) {
    const link = e.target;
    const siblings = link
      .closest(".nav-desktop")
      .querySelectorAll(".nav-desktop__link");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
  }
};
// desktop nav
nav.addEventListener("mouseover", handleHover.bind(0.3));
nav.addEventListener("mouseout", handleHover.bind(1));

//////////////////////////
// Fade items into view while scrolling and slide in
const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

sliders.forEach((slider) => {
  appearOnScroll.observe(slider);
});

/////////////////////
// json file with my fe works
async function populate() {
  try {
    const response = await fetch(
      "https://milanzivanov.github.io/Data/works.json"
    );
    const data = await response.json();
    const { skills, works } = data;
    populateSkills(skills);
    populateWorks(works);
  } catch (error) {
    console.error("Error fetching data: ", error.message);
  }
}

function populateSkills(skills) {
  const container = document.querySelector(".skills-container-icons");
  const skillsToShow = skills.slice(0, 6);
  const remainingSkills = skills.slice(6);

  container.innerHTML = skillsToShow
    .map(
      (skill) => `
        <div class="skill-icon border-radius">
          <i class="${skill.iconClass}"></i>
          <p>${skill.iconTitle}</p>
        </div>
      `
    )
    .join("");

  if (remainingSkills.length > 0) {
    const toggleButton = document.querySelector(".toggle-button");
    toggleButton.classList.add("more-less-btn");
    toggleButton.textContent = "Show more";

    toggleButton.addEventListener("click", () => {
      if (toggleButton.textContent === "Show more") {
        const additionalSkillsHtml = remainingSkills
          .map(
            (skill) => `
              <div class="skill-icon border-radius">
                <i class="${skill.iconClass}"></i>
                <p>${skill.iconTitle}</p>
                </div>
                `
          )
          .join("");
        container.insertAdjacentHTML("beforeend", additionalSkillsHtml);
        toggleButton.textContent = "Show less";
      } else {
        container.innerHTML = skillsToShow
          .map(
            (skill) => `
              <div class="skill-icon border-radius">
                <i class="${skill.iconClass}"></i>
                <p>${skill.iconTitle}</p>
              </div>
            `
          )
          .join("");
        toggleButton.textContent = "Show more";
      }
    });
  }
}

function populateWorks(works) {
  const section = document.querySelector(".swiper-wrapper");

  section.innerHTML = works
    .map(
      (work) => `
      <div class="swiper-slide">
        <div class="project__container">
          <div class="project-image project-details-btn">
            <img data-src="${work.src}" src="${work.src}" alt="${work.title}">
          </div>
          <div class="project__item">
            <div class="project__text-container">
              <h3 class="h3-primary-title project-container--title">${
                work.title
              }</h3>
              <div class="project__text-container--description">
                <p class="paragraph-text paragraph-text--project paragraph-text--border-bottom">${
                  work.body
                }</p>
                <p class="paragraph-text">${work.projectTime}</p>
                <div class="skill-container border-radius">
                  <p class="paragraph-strong">Skill used:</p>
                  <ul class="list-icon-container">
                    ${work.technologiesUsed
                      .map(
                        (skill) =>
                          `<li><i class="${skill.svgIcon} devicon"></i></li>`
                      )
                      .join("")}
                  </ul>
                </div>
              </div>
              <div class="btn-container">
                <a href="${
                  work.linkSrc
                }" target="_blank" rel="dns-prefetch" class="btn btn--size btn--theme border-radius">View It Here 🚀</a>            
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

//
const images = document.querySelectorAll("img[data-src]");

function preloadImage(img) {
  const src = img.getAttribute("data-src");
  if (!src) {
    return;
  }
  img.src = src;
}

const imgOptions = {
  threshold: 0,
  rootMargin: "0px 0px 200px 0px"
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    preloadImage(entry.target);
    imgObserver.unobserve(entry.target);
  });
}, imgOptions);

images.forEach((image) => {
  imgObserver.observe(image);
});

populate();

/////////////////////
// Set date
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

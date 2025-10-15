const header = document.querySelector(".header");
const burger = header.querySelector(".burger");
const navWrapper = header.querySelector(".nav__wrapper");
const body = document.querySelector("body");
const navLinks = header.querySelectorAll(" .nav-list__link");
const menuLink = header.querySelector(".header__menu-link");
const menuLinkActive = header.querySelector(".header__menu-link--active");

if (menuLinkActive) {
  menuLinkActive.addEventListener("click", (e) => {
    e.preventDefault();
  });
}

burger.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  navWrapper.classList.toggle("open");
  burger.classList.toggle("cross");
  body.classList.toggle("no-scroll");
});

function closeMenuOnLink() {
  if (window.innerWidth <= 768) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        burger.classList.remove("cross");
        navWrapper.classList.remove("open");
        body.classList.remove("no-scroll");
      });
    });
    menuLink.addEventListener("click", () => {
      burger.classList.remove("cross");
      navWrapper.classList.remove("open");
      body.classList.remove("no-scroll");
    });
  }
}

window.addEventListener("resize", () => {
  closeMenuOnLink();
});

closeMenuOnLink();

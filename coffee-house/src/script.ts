const header = document.querySelector(".header") as HTMLElement;
const burger = header.querySelector(".burger") as HTMLElement;
const navWrapper = header.querySelector(".nav__wrapper") as HTMLElement;
const body = document.querySelector("body") as HTMLElement;
const navLinks = header.querySelectorAll<HTMLElement>(" .nav-list__link");
const menuLink = header.querySelector(".header__menu-link") as HTMLElement;
const menuLinkActive = header.querySelector(
  ".header__menu-link--active"
) as HTMLElement;
const headerCartLink = header.querySelector(".header__cart-txt") as HTMLElement;

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
  headerCartLink.classList.remove("visually-hidden");
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
    headerCartLink.addEventListener("click", () => {
      burger.classList.remove("cross");
      navWrapper.classList.remove("open");
      body.classList.remove("no-scroll");
    });
  } else {
    headerCartLink.classList.add("visually-hidden");
  }
}

window.addEventListener("resize", () => {
  closeMenuOnLink();
});

closeMenuOnLink();

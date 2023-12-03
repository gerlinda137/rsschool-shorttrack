const header = document.querySelector(".header");
const burger = header.querySelector(".burger");
const navWrapper = header.querySelector(".nav__wrapper");
const body = document.querySelector("body");

burger.onclick = () => {
  navWrapper.classList.toggle("open");
  burger.classList.toggle("cross");
  body.classList.toggle("no-scroll");
};

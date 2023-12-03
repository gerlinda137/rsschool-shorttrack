const burger = document.querySelector(".burger");
const navWrapper = document.querySelector(".nav__wrapper");
burger.onclick = () => {
  navWrapper.classList.toggle("open");
  burger.classList.toggle("cross");
};

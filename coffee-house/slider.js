const slider = document.querySelector(".slider");
const visibleWindow = slider.querySelector(".slider-window");
const cardsTrack = slider.querySelector(".slider-cards");
const card = slider.querySelector(".slider-card");
const prevBtn = slider.querySelector("#prev-btn");
const nextBtn = slider.querySelector("#next-btn");
const paginationBtns = slider.querySelectorAll(".slider__pagination-item");
let cardWidth = card.offsetWidth;
const paginationBtnFirst = document.querySelector(".slider__pagination-item");
let currentActiveSlide = 0;
let timerInterval = 5;

const paginationActiveBar = document.createElement("span");
paginationActiveBar.classList.add("slider__pagination-item--active");
paginationBtnFirst.appendChild(paginationActiveBar);

function switchToNextSlide() {
  paginationBtns.forEach((element) => {
    element.innerHTML = "";
  });
  if (currentActiveSlide >= 2) {
    currentActiveSlide = 0;
  } else {
    currentActiveSlide++;
  }
  translateToCurActiveSlide();
  const paginationActiveBar = document.createElement("span");
  paginationActiveBar.classList.add("slider__pagination-item--active");
  paginationBtns[currentActiveSlide].appendChild(paginationActiveBar);
  timerInterval = 5;
}

nextBtn.addEventListener("click", switchToNextSlide);

function switchToPrevSlide() {
  paginationBtns.forEach((element) => {
    if (element.hasChildNodes) {
      element.removeChild(element.firstChild);
    }
  });
  if (currentActiveSlide <= 0) {
    currentActiveSlide = 2;
  } else {
    currentActiveSlide--;
  }
  translateToCurActiveSlide();
  const paginationActiveBar = document.createElement("span");
  paginationActiveBar.classList.add("slider__pagination-item--active");
  paginationBtns[currentActiveSlide].appendChild(paginationActiveBar);
  timerInterval = 5;
}

prevBtn.addEventListener("click", switchToPrevSlide);

function translateToCurActiveSlide() {
  cardsTrack.style.transform = `translateX(${
    -currentActiveSlide * cardWidth
  }px)`;
}

let remainingTime = 0;
let cursorOnSlider = false;

const sliderTimer = setInterval(() => {
  if (!cursorOnSlider) {
    if (timerInterval !== 0) {
      timerInterval--;
      document.querySelector(".slider__pagination-item--active").style.width =
        (5 - timerInterval) * 20 + "%";
    } else {
      switchToNextSlide();
      timerInterval = 5;
    }
  }
}, 1000);

visibleWindow.addEventListener("mouseover", () => {
  cursorOnSlider = true;
});

visibleWindow.addEventListener("mouseleave", () => {
  cursorOnSlider = false;
});

//touch
let touchstartX = 0;
let touchendX = 0;

function onSwipe() {
  //right
  if (touchendX > touchstartX) {
    switchToPrevSlide();
  }
  //left
  if (touchendX < touchstartX) {
    switchToNextSlide();
  }
}

slider.addEventListener("touchstart", (e) => {
  touchstartX = e.changedTouches[0].screenX;
});

slider.addEventListener("touchend", (e) => {
  touchendX = e.changedTouches[0].screenX;
  onSwipe();
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 767) {
    visibleWindow.style.maxWidth = "348px";
    cardWidth = card.offsetWidth;
  } else {
    visibleWindow.style.maxWidth = "480px";
    cardWidth = card.offsetWidth;
  }
});

const slider = document.querySelector(".slider");
const visibleWindow = slider.querySelector(".slider-window");
const cardsTrack = slider.querySelector(".slider-cards");
const card = slider.querySelector(".slider-card");
const prevBtn = slider.querySelector("#prev-btn");
const nextBtn = slider.querySelector("#next-btn");
const paginationBtns = slider.querySelectorAll(".slider__pagination-item");
const cardWidth = card.offsetWidth;
const paginationBtnFirst = document.querySelector(".slider__pagination-item");
let currentActiveSlide = 0;
let timerInterval = 5;

paginationBtnFirst.classList.add("slider__pagination-item--active");

function switchToNextSlide() {
  paginationBtns.forEach((element) => {
    element.classList.remove("slider__pagination-item--active");
  });
  if (currentActiveSlide >= 2) {
    currentActiveSlide = 0;
  } else {
    currentActiveSlide++;
  }
  console.log(currentActiveSlide);
  translateToCurActiveSlide();
  paginationBtns[currentActiveSlide].classList.add(
    "slider__pagination-item--active"
  );
  timerInterval = 5;
}

nextBtn.addEventListener("click", switchToNextSlide);

function switchToPrevSlide() {
  paginationBtns.forEach((element) => {
    element.classList.remove("slider__pagination-item--active");
  });
  if (currentActiveSlide <= 0) {
    currentActiveSlide = 2;
  } else {
    currentActiveSlide--;
  }
  console.log(currentActiveSlide);
  translateToCurActiveSlide();
  paginationBtns[currentActiveSlide].classList.add(
    "slider__pagination-item--active"
  );
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
    } else {
      switchToNextSlide();
      timerInterval = 5;
    }
    console.log(timerInterval);
  }
}, 1000);

visibleWindow.addEventListener("mouseover", () => {
  cursorOnSlider = true;
  console.log("hover");
});

visibleWindow.addEventListener("mouseleave", () => {
  cursorOnSlider = false;
  console.log("hover left");
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

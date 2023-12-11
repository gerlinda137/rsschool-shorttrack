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

prevBtn.addEventListener("click", function name() {
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
});

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

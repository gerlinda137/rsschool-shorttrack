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
});

function translateToCurActiveSlide() {
  cardsTrack.style.transform = `translateX(${
    -currentActiveSlide * cardWidth
  }px)`;
}

const sliderTimer = setInterval(switchToNextSlide, 5000);

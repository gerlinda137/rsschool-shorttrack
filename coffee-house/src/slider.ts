const slider = document.querySelector(".slider") as HTMLElement;
const visibleWindow = slider.querySelector(".slider-window") as HTMLElement;
const cardsTrack = slider.querySelector(".slider-cards") as HTMLElement;
const card = slider.querySelector(".slider-card") as HTMLElement;
const prevBtn = slider.querySelector("#prev-btn") as HTMLButtonElement;
const nextBtn = slider.querySelector("#next-btn") as HTMLButtonElement;
const paginationBtns = slider.querySelectorAll<HTMLElement>(
  ".slider__pagination-item"
);
let cardWidth = card.offsetWidth;
const paginationBtnFirst = document.querySelector(
  ".slider__pagination-item"
) as HTMLElement;
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
    element.innerHTML = "";
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

let cursorOnSlider = false;

setInterval(() => {
  if (!cursorOnSlider) {
    if (timerInterval !== 0) {
      timerInterval--;
      const activeSlide = document.querySelector(
        ".slider__pagination-item--active"
      ) as HTMLElement;
      if (!activeSlide) {
        throw new Error("Slider element not found");
      }
      activeSlide.style.width = (5 - timerInterval) * 20 + "%";
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

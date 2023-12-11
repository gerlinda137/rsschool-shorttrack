const slider = document.querySelector(".slider");
const visibleWindow = slider.querySelector(".slider-window");
const cardsTrack = slider.querySelector(".slider-cards");
const card = slider.querySelector(".slider-card");
const prevBtn = slider.querySelector("#prev-btn");
const nextBtn = slider.querySelector("#next-btn");
// let curPosition = 0;
const cardWidth = card.offsetWidth;
let currentActiveSlide = 0;

nextBtn.addEventListener("click", function name() {
  if (currentActiveSlide >= 2) {
    // cardsTrack.style.transform = `translateX(0px)`;
    currentActiveSlide = 0;
  } else {
    currentActiveSlide++;
    // cardsTrack.style.transform = `translateX(${-(
    //   currentActiveSlide * cardWidth
    // )}px)`;
  }
  console.log(currentActiveSlide);
  translateToCurActiveSlide();
});

prevBtn.addEventListener("click", function name() {
  if (currentActiveSlide <= 0) {
    // cardsTrack.style.transform = `translateX(-960px)`;
    currentActiveSlide = 2;
  } else {
    currentActiveSlide--;
    // cardsTrack.style.transform = `translateX(${
    //   currentActiveSlide * cardWidth
    // }px)`;
  }
  console.log(currentActiveSlide);
  translateToCurActiveSlide();
});

function translateToCurActiveSlide() {
  cardsTrack.style.transform = `translateX(${
    -currentActiveSlide * cardWidth
  }px)`;
}

// nextBtn.addEventListener("click", function name() {
//   curPosition -= cardWidth;
//   if (currentActiveSlide >= 2) {
//     cardsTrack.style.transform = `translateX(0px)`;
//     currentActiveSlide = 0;
//     curPosition = 0;
//   } else {
//     currentActiveSlide++;
//     cardsTrack.style.transform = `translateX(${curPosition}px)`;
//   }
//   console.log(currentActiveSlide);
// });

// prevBtn.addEventListener("click", function name() {
//   curPosition += cardWidth;
//   if (currentActiveSlide <= 0) {
//     cardsTrack.style.transform = `translateX(-960px)`;
//     currentActiveSlide = 2;
//   } else {
//     currentActiveSlide--;
//     cardsTrack.style.transform = `translateX(${curPosition}px)`;
//   }
//   console.log(currentActiveSlide);
// });

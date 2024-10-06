const slidesContainer = document.getElementById("announcement-slides-container");
const slide = document.querySelector(".announcement-slide");
const prevButton = document.getElementById("announcement-slide-arrow-prev");
const nextButton = document.getElementById("announcement-slide-arrow-next");
const slideCount = document.querySelectorAll(".announcement-slide").length -1;

nextButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft += slideWidth;

  if(slidesContainer.scrollLeft >= (slideCount * slideWidth)) {
      slidesContainer.scrollLeft = 0;
  }
});

prevButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
});

setInterval(function () {nextButton.click();},2000);
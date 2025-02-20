const track = document.querySelector('.carousel-reviews-track');
const cards = Array.from(track.children);
const nextButton = document.querySelector('.carousel-reviews-btn.next');
const prevButton = document.querySelector('.carousel-reviews-btn.prev');

let currentIndex = 0;

function updateCarousel() {
  const cardWidth = cards[0].getBoundingClientRect().width;
  track.style.transition = 'transform 0.5s ease';
  track.style.transform = `translateX(-${currentIndex * (cardWidth + 20)}px)`;
}

nextButton.addEventListener('click', () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
  } else {
    track.style.transition = 'none';
    track.appendChild(track.firstElementChild);
    currentIndex--;
    updateCarousel();
    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease';
      currentIndex++;
      updateCarousel();
    }, 50);
    return;
  }
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    track.style.transition = 'none';
    track.insertBefore(track.lastElementChild, track.firstElementChild);
    currentIndex++;
    updateCarousel();
    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease';
      currentIndex--;
      updateCarousel();
    }, 50);
    return;
  }
  updateCarousel();
});

updateCarousel();
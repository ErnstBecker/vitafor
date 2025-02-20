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
    currentIndex++; // Avança para o próximo card
  } else {
    // Se estiver no último card, volta ao início sem animação
    track.style.transition = 'none';
    track.appendChild(track.firstElementChild); // Move o primeiro card para o final
    currentIndex--; // Ajusta o índice para manter a posição correta
    updateCarousel(); // Atualiza o carrossel sem animação
    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease'; // Reativa a transição
      currentIndex++; // Avança para o próximo card (agora o primeiro)
      updateCarousel(); // Atualiza o carrossel com animação
    }, 50);
    return; // Sai da função para evitar a execução duplicada
  }
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--; // Volta para o card anterior
  } else {
    // Se estiver no primeiro card, move o último card para o início sem animação
    track.style.transition = 'none';
    track.insertBefore(track.lastElementChild, track.firstElementChild); // Move o último card para o início
    currentIndex++; // Ajusta o índice para manter a posição correta
    updateCarousel(); // Atualiza o carrossel sem animação
    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease'; // Reativa a transição
      currentIndex--; // Volta para o card anterior (agora o último)
      updateCarousel(); // Atualiza o carrossel com animação
    }, 50);
    return; // Sai da função para evitar a execução duplicada
  }
  updateCarousel();
});

updateCarousel();
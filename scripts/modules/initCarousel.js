export function initCarousel() {
	const carousel = document.querySelector('.carousel');
	const track = document.querySelector('.carousel-track');

	// Slides cloning
	let slides = Array.from(track.children);
	const firstClone = slides[0].cloneNode(true);
	const lastClone = slides[slides.length - 1].cloneNode(true);
	track.insertBefore(lastClone, slides[0]);
	track.appendChild(firstClone);

	// Array of slides and define initial index for the first real slide
	slides = Array.from(track.children);
	let currentIndex = 1;
	let slideWidth = slides[0].offsetWidth;

	// Adjust initial position without transition
	track.style.transform = `translateX(${-currentIndex * slideWidth}px)`;

	const prevBtn = document.querySelector('.carousel-btn.prev');
	const nextBtn = document.querySelector('.carousel-btn.next');

	let isDragging = false;
	let startPos = 0;
	let currentTranslate = 0;
	let prevTranslate = 0;
	let animationID;

	function setPosition(transition = true) {
		if (transition) {
			track.style.transition = 'transform 0.3s ease';
		} else {
			track.style.transition = 'none';
		}
		track.style.transform = `translateX(${-currentIndex * slideWidth + currentTranslate}px)`;
	}

	function animate() {
		setPosition();
		if (isDragging) requestAnimationFrame(animate);
	}

	function getPositionX(event) {
		return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
	}

	function touchStart(event) {
		isDragging = true;
		startPos = getPositionX(event);
		animationID = requestAnimationFrame(animate);
	}

	function touchMove(event) {
		if (!isDragging) return;
		const currentPosition = getPositionX(event);
		currentTranslate = currentPosition - startPos;
	}

	function touchEnd() {
		cancelAnimationFrame(animationID);
		isDragging = false;
		if (currentTranslate < -50) {
			currentIndex++;
		} else if (currentTranslate > 50) {
			currentIndex--;
		}
		currentTranslate = 0;
		setPosition();
	}

	// Adjust after transition end
	track.addEventListener('transitionend', () => {
		if (slides[currentIndex].isEqualNode(firstClone)) {
			setPosition(false);
			currentIndex = 1;
			setPosition(false);
		} else if (slides[currentIndex].isEqualNode(lastClone)) {
			setPosition(false);
			currentIndex = slides.length - 2;
			setPosition(false);
		}
	});

	// Nav buttons
	function moveToNext() {
		currentIndex++;
		setPosition();
	}
	function moveToPrev() {
		currentIndex--;
		setPosition();
	}

	prevBtn.addEventListener('click', moveToPrev);
	nextBtn.addEventListener('click', moveToNext);

	// Mouse Events
	track.addEventListener('mousedown', touchStart);
	track.addEventListener('mousemove', touchMove);
	track.addEventListener('mouseup', touchEnd);
	track.addEventListener('mouseleave', () => { if (isDragging) touchEnd(); });

	// Touch Events
	track.addEventListener('touchstart', touchStart);
	track.addEventListener('touchmove', touchMove);
	track.addEventListener('touchend', touchEnd);

	// Prevent default image dragging behavior
	slides.forEach(slide => {
		slide.addEventListener('dragstart', (e) => e.preventDefault());
	});

	// Function to update carousel dimensions
	function updateCarouselDimensions() {
		slideWidth = slides[0].offsetWidth;
		track.style.transition = 'none';
		track.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
	}
	window.addEventListener('resize', updateCarouselDimensions);
}

(function() {
  const carousel = document.querySelector('.products-carousel');
  if (!carousel) return;
  const track = carousel.querySelector('.carousel-track');
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const items = track.children;
  if (!items.length) return;
  let itemWidth = items[0].getBoundingClientRect().width;

  function slide(direction) {
    if (direction === 'next') {
      track.style.transition = 'transform 0.5s ease';
      track.style.transform = `translateX(-${itemWidth}px)`;
      track.addEventListener('transitionend', () => {
        track.style.transition = 'none';
        track.appendChild(track.firstElementChild);
        track.style.transform = 'translateX(0)';
      }, { once: true });
    } else {
      // Rearrange items para o efeito "infinito"
      track.style.transition = 'none';
      track.insertBefore(track.lastElementChild, track.firstElementChild);
      track.style.transform = `translateX(-${itemWidth}px)`;

      // Força reflow
      track.offsetHeight;

      track.style.transition = 'transform 0.5s ease';
      track.style.transform = 'translateX(0)';
    }
  }

  nextBtn.addEventListener('click', () => slide('next'));
  prevBtn.addEventListener('click', () => slide('prev'));

  // Modal logic: abre ao clicar num item do carousel
  const modal = document.getElementById('productModal');
  const modalImage = document.getElementById('modalImage');
  const closeBtn = modal.querySelector('.close-btn');

  track.addEventListener('click', (event) => {
    const target = event.target.closest('.carousel-item');
    if(target) {
      modalImage.src = target.src;
      modal.style.display = 'flex';
    }
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
})();

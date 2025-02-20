const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');

let currentIndex = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

// Atualiza a posição do track
function updateCarousel() {
	track.style.transform = `translateX(-${currentIndex * 100}%)`;
	prevTranslate = -currentIndex * track.clientWidth;
}

// Botões de navegação
prevButton.addEventListener('click', () => {
	currentIndex = Math.max(0, currentIndex - 1);
	updateCarousel();
});
nextButton.addEventListener('click', () => {
	currentIndex = Math.min(slides.length - 1, currentIndex + 1);
	updateCarousel();
});

// Arrastar com mouse ou toque
track.addEventListener('mousedown', dragStart);
track.addEventListener('touchstart', dragStart);

track.addEventListener('mouseup', dragEnd);
track.addEventListener('touchend', dragEnd);

track.addEventListener('mousemove', dragAction);
track.addEventListener('touchmove', dragAction);

function dragStart(event) {
	isDragging = true;
	startPos = getPositionX(event);
	track.classList.add('dragging');
}
function dragAction(event) {
	if (!isDragging) return;
	const currentPosition = getPositionX(event);
	const diff = currentPosition - startPos;
	track.style.transform = `translateX(${prevTranslate + diff}px)`;
}
function dragEnd() {
	if (!isDragging) return;
	isDragging = false;
	track.classList.remove('dragging');
	const movedBy = getCurrentTranslate() - prevTranslate;
	if (movedBy < -50 && currentIndex < slides.length - 1) currentIndex++;
	if (movedBy > 50 && currentIndex > 0) currentIndex--;
	updateCarousel();
}
function getPositionX(event) {
	return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}
function getCurrentTranslate() {
	const style = window.getComputedStyle(track);
	const matrix = new WebKitCSSMatrix(style.transform);
	return matrix.m41;
}

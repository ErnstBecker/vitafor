export default function initTimer() {
	const timerDisplay = document.getElementById('timerDisplay');
	if (!timerDisplay) return;

	let timeRemaining = 60 * 60;

	function updateTimer() {
		const minutes = Math.floor(timeRemaining / 60);
		const seconds = timeRemaining % 60;
		timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
		if (timeRemaining <= 0) {
			clearInterval(interval);
		}
		timeRemaining--;
	}

	updateTimer();
	const interval = setInterval(updateTimer, 1000);
}

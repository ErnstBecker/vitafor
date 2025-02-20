function initGreetings() {
	window.addEventListener('DOMContentLoaded', () => {
		// Retrieve full name from localStorage
		const fullName = localStorage.getItem('name');
		if (fullName) {
			// Get only the first name
			const firstName = fullName.split(' ')[0];
			const greetingsElements = document.getElementById('user-greetings');
			if (greetingsElements) {
				greetingsElements.textContent = firstName;
			}
		}
	});
}
export default initGreetings;

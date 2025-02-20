export default function initMenu() {
	const menuBtn = document.getElementById("btnMenu");
	if (!menuBtn) return;

	function handleClick(e) {
		if (e.type === "touchstart") e.preventDefault();

		const nav = document.querySelector(".navbar");
		if (!nav) return;

		nav.classList.toggle("active");
		menuBtn.classList.toggle("active");
		document.body.classList.toggle("active");

		const popupMenu = document.querySelector(".popup-menu");
		if (popupMenu) {
			popupMenu.classList.toggle("active");
		}

		const isActive = nav.classList.contains("active");
		menuBtn.setAttribute("aria-expanded", isActive);
		menuBtn.setAttribute("aria-label", isActive ? "Close Menu" : "Open Menu");
	}

	menuBtn.addEventListener("click", handleClick);
	menuBtn.addEventListener("touchstart", handleClick);
}

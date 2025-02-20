document.addEventListener('DOMContentLoaded', () => {
	// Check if signup data exists in localStorage. If so, hide form and lock scroll.
  if (localStorage.getItem('name') && localStorage.getItem('email') && localStorage.getItem('phone')) {
    const signupContainer = document.querySelector('.signup-container');
    if (signupContainer) {
      signupContainer.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  } else {
    const signupContainer = document.querySelector('.signup-container');
    if (signupContainer) {
      document.body.style.overflow = 'hidden';
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Name validation: must not be blank
  const nameInput = document.querySelector('#signupForm input[name="name"]');
  if (nameInput) {
    const validate = (e) => {
      e.target.style.borderColor = e.target.value.trim() !== '' ? '#0f0' : '#f00';
    };
    nameInput.addEventListener('blur', validate);
    nameInput.addEventListener('input', validate);
  }

  // Email validation: must not be blank and must include '@'
  const emailInput = document.querySelector('#signupForm input[name="email"]');
  if (emailInput) {
    const validateEmail = (e) => {
      e.target.style.borderColor = (e.target.value.trim() !== '' && e.target.value.includes('@')) ? '#0f0' : '#f00';
    };
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', validateEmail);
  }

  // Phone validation: mask applied only when exactly 11 digits are entered.
  const phoneInput = document.querySelector('#signupForm input[name="phone"]');
  if (phoneInput) {
    const validateAndMaskPhone = (e) => {
      let input = e.target;
      const digits = input.value.replace(/\D/g, '');
      if (digits.length === 11) {
        const area = digits.slice(0,2);
        const firstPart = digits.slice(2,7);
        const secondPart = digits.slice(7,11);
        input.value = `(${area}) ${firstPart}-${secondPart}`;
        input.style.borderColor = '#0f0';
      } else {
        input.style.borderColor = '#f00';
      }
    };
    phoneInput.addEventListener('blur', validateAndMaskPhone);
    phoneInput.addEventListener('input', validateAndMaskPhone);
  }

  const signupForm = document.querySelector('#signupForm');

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameValue = nameInput?.value.trim() || '';
      const emailValue = emailInput?.value.trim() || '';
      const phoneDigits = (phoneInput?.value || '').replace(/\D/g, '');

      const isNameValid = nameValue !== '';
      const isEmailValid = emailValue !== '' && emailValue.includes('@');
      const isPhoneValid = phoneDigits.length === 11;

      if (isNameValid && isEmailValid && isPhoneValid) {
        localStorage.setItem('name', nameValue);
        localStorage.setItem('email', emailValue);
        localStorage.setItem('phone', phoneInput.value);
      } else {
				throw new Error('Validation failed. Please check your inputs.');
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const button = contactForm.querySelector('button');
      if (!button) return;

      const originalText = button.textContent;
      button.textContent = 'Message sent';
      button.disabled = true;

      setTimeout(function () {
        button.textContent = originalText;
        button.disabled = false;
        contactForm.reset();
      }, 1800);
    });
  }
});

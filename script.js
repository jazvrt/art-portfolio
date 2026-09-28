// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = -1;
let allImages = [];

// Collect all gallery items
const galleryItems = document.querySelectorAll('.gallery-item');

if (galleryItems.length > 0) {
  galleryItems.forEach((item) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('figcaption')?.textContent || 'Artwork';
    
    if (img) {
      allImages.push({
        src: img.src,
        caption: caption
      });
    }
  });

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', function () {
      openLightbox(index);
    });
  });
}

function openLightbox(index) {
  currentImageIndex = index;
  updateLightboxImage();
  lightbox.classList.add('is-visible');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('is-visible');
  document.body.style.overflow = 'auto';
  currentImageIndex = -1;
}

function updateLightboxImage() {
  if (allImages[currentImageIndex]) {
    lightboxImage.src = allImages[currentImageIndex].src;
    lightboxCaption.textContent = allImages[currentImageIndex].caption;
  }
}

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxBackdrop) {
  lightboxBackdrop.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
  lightboxPrev.addEventListener('click', function () {
    currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    updateLightboxImage();
  });
}

if (lightboxNext) {
  lightboxNext.addEventListener('click', function () {
    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    updateLightboxImage();
  });
}

// Keyboard navigation
document.addEventListener('keydown', function (e) {
  if (lightbox.classList.contains('is-visible')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
    if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
  }
});

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const button = contactForm.querySelector('.btn-submit');
    const originalText = button.textContent;
    button.textContent = 'Message sent!';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      contactForm.reset();
    }, 2000);
  });
}

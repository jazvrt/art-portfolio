// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });
}

// Gallery and Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxOverlay = document.querySelector('.lightbox-overlay');

let currentImageIndex = 0;
let images = [];

// Collect all images
galleryItems.forEach((item, index) => {
  const img = item.querySelector('img');
  const title = item.dataset.title || 'Artwork';
  images.push({
    src: img.src,
    title: title
  });

  // Add click to open lightbox
  item.addEventListener('click', () => {
    currentImageIndex = index;
    openLightbox();
  });
});

function openLightbox() {
  const image = images[currentImageIndex];
  lightboxImage.src = image.src;
  lightboxCaption.textContent = image.title;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  openLightbox();
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  openLightbox();
}

// Lightbox controls
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

// Keyboard controls
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});

// Contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = contactForm.querySelector('.btn');
    const originalText = button.textContent;
    button.textContent = 'Sent ✓';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      contactForm.reset();
    }, 2000);
  });
}

// Back to top button
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '↑';
backToTop.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });
}

// Gallery lightbox with zoom
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');

if (lightbox && galleryItems.length) {
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let images = [];
  let currentIndex = 0;
  let isZoomed = false;
  let zoomX = 0;
  let zoomY = 0;

  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const title = item.dataset.title || 'Artwork';
    images.push({ src: img.getAttribute('src'), title: title });

    item.addEventListener('click', () => {
      currentIndex = index;
      openLightbox();
    });
  });

  function openLightbox() {
    const item = images[currentIndex];
    lightboxImage.setAttribute('src', item.src);
    lightboxImage.setAttribute('alt', item.title);
    lightboxCaption.textContent = item.title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    isZoomed = false;
    lightboxImage.classList.remove('zoomed');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    isZoomed = false;
    lightboxImage.classList.remove('zoomed');
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox();
  }

  // Zoom on click
  lightboxImage.addEventListener('click', (e) => {
    if (!isZoomed) {
      // Zoom in
      const rect = lightboxImage.getBoundingClientRect();
      zoomX = ((e.clientX - rect.left) / rect.width) * 100;
      zoomY = ((e.clientY - rect.top) / rect.height) * 100;
      lightboxImage.style.transformOrigin = zoomX + '% ' + zoomY + '%';
      lightboxImage.classList.add('zoomed');
      isZoomed = true;
    } else {
      // Zoom out
      lightboxImage.classList.remove('zoomed');
      isZoomed = false;
    }
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', showNext);
  lightboxPrev.addEventListener('click', showPrev);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

// Contact form
const contactForm = document.getElementById('contactForm');
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

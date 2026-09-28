const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", function () {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxBackdrop = document.getElementById("lightboxBackdrop");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let allImages = [];
const galleryItems = document.querySelectorAll(".gallery-item");

if (galleryItems.length) {
  galleryItems.forEach((item) => {
    const img = item.querySelector("img");
    const title = item.dataset.title || "Artwork";

    if (img) {
      allImages.push({
        src: img.src,
        title: title,
      });
    }
  });

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      openLightbox(index);
    });
  });
}

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  updateLightboxImage();
  lightbox.classList.add("is-visible");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-visible");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";
}

function updateLightboxImage() {
  if (!allImages.length) return;
  const item = allImages[currentIndex];
  if (item) {
    lightboxImage.src = item.src;
    lightboxCaption.textContent = item.title;
  }
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxBackdrop) {
  lightboxBackdrop.addEventListener("click", closeLightbox);
}

if (lightboxPrev) {
  lightboxPrev.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    updateLightboxImage();
  });
}

if (lightboxNext) {
  lightboxNext.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % allImages.length;
    updateLightboxImage();
  });
}

document.addEventListener("keydown", function (event) {
  if (!lightbox.classList.contains("is-visible")) return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    lightboxPrev.click();
  }

  if (event.key === "ArrowRight") {
    lightboxNext.click();
  }
});

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const button = contactForm.querySelector(".btn");
    const originalText = button.textContent;

    button.textContent = "Message sent!";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      contactForm.reset();
    }, 2000);
  });
}

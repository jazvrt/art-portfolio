const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.textContent = '↑';
backToTop.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTop);
window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 300));
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

const galleryItems = document.querySelectorAll('.gallery-item, .zoomable');
const lightbox = document.getElementById('lightbox');
if (lightbox && galleryItems.length) {
  const image = document.getElementById('lightboxImage');
  const caption = document.getElementById('lightboxCaption');
  const close = document.getElementById('lightboxClose');
  const overlay = document.getElementById('lightboxOverlay');
  const prev = document.getElementById('lightboxPrev');
  const next = document.getElementById('lightboxNext');
  const viewport = document.getElementById('zoomViewport') || (image ? image.parentElement : null);

  if (image && caption && close && overlay && viewport) {
    const images = [];
    let index = 0;
    let zoomed = false;
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let offsetX = 0;
    let offsetY = 0;

    galleryItems.forEach((item) => {
      const img = item.tagName === 'IMG' ? item : item.querySelector('img');
      if (!img) return;
      const title = item.dataset?.title || img.alt || item.closest('figure')?.querySelector('figcaption')?.textContent || 'Artwork';
      const lightboxIndex = images.push({ src: img.src, title }) - 1;
      item.addEventListener('click', () => {
        index = lightboxIndex;
        open();
      });
    });

    function resetZoom() {
      zoomed = false;
      dragging = false;
      offsetX = 0;
      offsetY = 0;
      viewport.classList.remove('zoomed', 'dragging');
      image.style.transform = 'translate(0px, 0px) scale(1)';
    }

    function open() {
      const item = images[index];
      if (!item) return;
      image.src = item.src;
      image.alt = item.title;
      caption.textContent = item.title;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      resetZoom();
    }

    function closeBox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      resetZoom();
    }

    function show(direction) {
      if (!images.length) return;
      index = (index + direction + images.length) % images.length;
      open();
    }

    image.addEventListener('click', (e) => {
      if (dragging) return;
      if (!zoomed) {
        zoomed = true;
        viewport.classList.add('zoomed');
        const r = viewport.getBoundingClientRect();
        offsetX = (r.width / 2 - (e.clientX - r.left)) * 1.4;
        offsetY = (r.height / 2 - (e.clientY - r.top)) * 1.4;
        image.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(2.4)`;
      } else {
        resetZoom();
      }
    });

    viewport.addEventListener('pointerdown', (e) => {
      if (!zoomed) return;
      dragging = true;
      viewport.classList.add('dragging');
      startX = e.clientX - offsetX;
      startY = e.clientY - offsetY;
      viewport.setPointerCapture(e.pointerId);
    });

    viewport.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      offsetX = e.clientX - startX;
      offsetY = e.clientY - startY;
      image.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(2.4)`;
    });

    viewport.addEventListener('pointerup', () => {
      dragging = false;
      viewport.classList.remove('dragging');
    });

    close.addEventListener('click', closeBox);
    overlay.addEventListener('click', closeBox);
    if (prev) prev.addEventListener('click', () => show(-1));
    if (next) next.addEventListener('click', () => show(1));

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeBox();
      if (e.key === 'ArrowLeft') show(-1);
      if (e.key === 'ArrowRight') show(1);
    });
  }
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = contactForm.querySelector('.btn');
    const original = button.textContent;
    button.textContent = 'Sent ✓';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
      contactForm.reset();
    }, 2000);
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

const cartItems = document.getElementById('cartItems');
if (cartItems) {
  const cart = [];
  const count = document.getElementById('cartCount');
  const total = document.getElementById('cartTotal');

  document.querySelectorAll('.add-to-cart').forEach((button) =>
    button.addEventListener('click', () => {
      cart.push({ name: button.dataset.name, price: Number(button.dataset.price) });
      showToast(`${button.dataset.name} added to cart ✓`);
      renderCart();
    })
  );

  function renderCart() {
    count.textContent = cart.length;
    total.textContent = '$' + cart.reduce((sum, item) => sum + item.price, 0).toLocaleString();
    cartItems.innerHTML = cart.length
      ? cart
          .map(
            (item, i) =>
              `<div class="cart-row"><span>${item.name}</span><span>$${item.price.toLocaleString()} <button aria-label="Remove item" data-remove="${i}">×</button></span></div>`
          )
          .join('')
      : '<p class="cart-empty">Your cart is empty.</p>';

    cartItems.querySelectorAll('[data-remove]').forEach((button) =>
      button.addEventListener('click', () => {
        cart.splice(Number(button.dataset.remove), 1);
        renderCart();
      })
    );
  }

  const checkout = document.getElementById('checkoutButton');
  if (checkout) {
    checkout.addEventListener('click', () =>
      alert(
        cart.length
          ? 'This is a demo checkout. Connect Stripe, PayPal, or another provider to accept payment.'
          : 'Add a work to your cart first.'
      )
    );
  }
}

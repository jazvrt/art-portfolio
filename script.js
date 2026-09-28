* {
  box-sizing: border-box;
}

:root {
  --bg: #f5f3f1;
  --panel: #ffffff;
  --ink: #0d0d0d;
  --muted: #5d5d5d;
  --line: rgba(13, 13, 13, 0.12);
  --shadow: 0 20px 46px rgba(0, 0, 0, 0.08);
  --soft: #efefef;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img {
  display: block;
  width: 100%;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea {
  font: inherit;
}

.container {
  width: min(1180px, calc(100% - 36px));
  margin: 0 auto;
}

.section-space {
  padding: 100px 0;
}

.eyebrow {
  letter-spacing: 0.17em;
  font-size: 0.74rem;
  text-transform: uppercase;
  margin: 0 0 18px;
}

.muted {
  color: var(--muted);
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(245, 243, 241, 0.88);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}

.nav-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 74px;
}

.brand {
  font-size: 1.45rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: lowercase;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 26px;
  color: var(--ink);
  font-size: 0.92rem;
}

.main-nav a {
  position: relative;
  transition: opacity 0.25s ease;
}

.main-nav a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 1px;
  background: var(--ink);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.28s ease;
}

.main-nav a:hover::after {
  transform: scaleX(1);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: transparent;
  gap: 5px;
}

.menu-toggle span {
  display: block;
  width: 18px;
  height: 1.5px;
  background: var(--ink);
}

.hero {
  position: relative;
  min-height: 660px;
  display: flex;
  align-items: center;
  background:
    linear-gradient(180deg, rgba(16, 16, 16, 0.2), rgba(16, 16, 16, 0.18)),
    url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1800&q=80') center/cover no-repeat;
}

.hero-inner {
  position: relative;
  z-index: 1;
  padding: 90px 0;
  color: var(--panel);
}

.hero h1 {
  margin: 0;
  font-size: clamp(4rem, 10vw, 9rem);
  line-height: 0.9;
  letter-spacing: 0.12em;
  text-transform: lowercase;
  font-weight: 700;
}

.hero-copy {
  max-width: 520px;
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  margin-top: 18px;
  color: rgba(255, 255, 255, 0.88);
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 28px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: transform 0.28s ease, opacity 0.28s ease, background 0.28s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-light {
  background: var(--panel);
  color: var(--ink);
}

.btn-dark {
  background: var(--ink);
  color: var(--panel);
}

.section-heading {
  margin-bottom: 32px;
}

.section-heading h2,
.about-copy h2,
.contact-copy h2 {
  margin: 0;
  font-size: clamp(2.3rem, 4vw, 4rem);
  line-height: 0.96;
  font-weight: 600;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 18px;
}

.gallery-item {
  position: relative;
  grid-column: span 4;
  background: var(--soft);
  overflow: hidden;
  border: 1px solid var(--line);
  cursor: pointer;
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
}

.gallery-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
  border-color: rgba(13, 13, 13, 0.22);
}

.gallery-item.large {
  grid-column: span 6;
}

.gallery-item img {
  height: 420px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover img {
  transform: scale(1.02);
}

.gallery-item figcaption {
  position: absolute;
  left: 18px;
  bottom: 18px;
  padding: 8px 12px;
  background: rgba(13, 13, 13, 0.56);
  color: var(--panel);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.7rem;
}

.about {
  background: #f0efee;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.about-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  align-items: center;
}

.about-copy {
  max-width: 680px;
}

.about-copy p {
  margin-top: 20px;
  color: var(--muted);
  font-size: 1.06rem;
}

.about-visual img {
  min-height: 500px;
  object-fit: cover;
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
}

.shop-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.product-card {
  background: var(--panel);
  border: 1px solid var(--line);
  overflow: hidden;
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.product-card img {
  height: 360px;
  object-fit: cover;
}

.product-content {
  padding: 18px 18px 20px;
}

.product-content h3 {
  margin: 0 0 10px;
  font-size: 1.35rem;
}

.product-content p {
  margin: 0;
  color: var(--muted);
}

.product-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}

.product-meta span {
  font-weight: 700;
}

.product-meta a {
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.contact-wrap {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 34px;
  align-items: start;
}

.contact-copy p {
  margin-top: 16px;
  color: var(--muted);
}

.contact-form {
  display: grid;
  gap: 16px;
  padding: 24px;
  background: var(--panel);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
}

.contact-form label {
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: #fff;
  color: var(--ink);
}

.contact-form textarea {
  min-height: 150px;
  resize: vertical;
}

.site-footer {
  border-top: 1px solid var(--line);
  background: #f1efee;
}

.footer-wrap {
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--muted);
}

.lightbox {
  position: fixed;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.32s ease;
}

.lightbox.is-visible {
  display: flex;
  opacity: 1;
  pointer-events: auto;
}

.lightbox-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.74);
  backdrop-filter: blur(8px);
}

.lightbox-panel {
  position: relative;
  z-index: 1;
  width: min(92vw, 980px);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 18px;
  overflow: hidden;
  transform: scale(0.94) translateY(18px);
  opacity: 0;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease;
}

.lightbox.is-visible .lightbox-panel {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.lightbox-close {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.32);
  color: var(--panel);
  font-size: 1.5rem;
}

#lightboxImage {
  width: 100%;
  max-height: 78vh;
  object-fit: contain;
  background: rgba(0, 0, 0, 0.3);
}

.lightbox-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 18px 22px 24px;
  color: var(--panel);
}

#lightboxCaption {
  margin: 0;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.72rem;
}

.lightbox-controls {
  display: flex;
  gap: 10px;
}

.lightbox-controls button {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: var(--panel);
  padding: 9px 14px;
  border-radius: 999px;
}

@media (max-width: 980px) {
  .gallery-item {
    grid-column: span 6;
  }

  .gallery-item.large {
    grid-column: span 12;
  }

  .about-grid,
  .contact-wrap {
    grid-template-columns: 1fr;
  }

  .shop-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .menu-toggle {
    display: flex;
  }

  .main-nav {
    display: none;
    position: absolute;
    top: 74px;
    left: 18px;
    right: 18px;
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
    padding: 18px 20px;
    background: rgba(245, 243, 241, 0.96);
    border: 1px solid var(--line);
    box-shadow: var(--shadow);
  }

  .main-nav.open {
    display: flex;
  }

  .main-nav a::after {
    display: none;
  }

  .gallery-item,
  .shop-grid {
    grid-column: span 12;
    grid-template-columns: 1fr;
  }

  .shop-grid {
    display: grid;
  }

  .hero {
    min-height: 520px;
  }

  .lightbox-panel {
    width: min(94vw, 760px);
  }

  .lightbox-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .lightbox-controls {
    width: 100%;
  }

  .lightbox-controls button {
    flex: 1;
  }
}

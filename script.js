* {
  box-sizing: border-box;
}

:root {
  --bg: #f3f1ef;
  --panel: #ffffff;
  --ink: #111111;
  --muted: #5d5d5d;
  --line: rgba(17, 17, 17, 0.12);
  --soft: #ededed;
  --shadow: 0 24px 48px rgba(17, 17, 17, 0.08);
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: "Inter", sans-serif;
  line-height: 1.6;
  letter-spacing: -0.01em;
}

img {
  display: block;
  max-width: 100%;
  width: 100%;
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
  width: min(1160px, calc(100% - 32px));
  margin: 0 auto;
}

.section-space {
  padding: 100px 0;
}

.eyebrow {
  margin: 0 0 18px;
  font-size: 0.74rem;
  letter-spacing: 0.18em;
  text-transform: lowercase;
}

.muted {
  color: var(--muted);
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  background: rgba(243, 241, 239, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}

.nav-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
}

.brand {
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: lowercase;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: 0.9rem;
}

.main-nav a {
  position: relative;
  color: var(--ink);
}

.main-nav a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -7px;
  width: 100%;
  height: 1px;
  background: var(--ink);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.main-nav a:hover::after {
  transform: scaleX(1);
}

.menu-toggle {
  display: none;
  width: 42px;
  height: 42px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: transparent;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
  background: linear-gradient(180deg, rgba(17, 17, 17, 0.22), rgba(17, 17, 17, 0.42)),
    url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1800&q=80') center/cover no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.04);
}

.hero-inner {
  position: relative;
  z-index: 1;
  color: var(--panel);
  padding: 100px 0;
}

.hero h1 {
  margin: 0;
  font-size: clamp(4rem, 9vw, 9rem);
  line-height: 0.9;
  letter-spacing: 0.12em;
  text-transform: lowercase;
  font-weight: 800;
}

.hero-copy {
  max-width: 560px;
  margin-top: 18px;
  font-size: clamp(1.08rem, 2vw, 1.38rem);
  color: rgba(255, 255, 255, 0.88);
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 28px;
}

.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  padding: 0 22px;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: transform 0.25s ease, background 0.25s ease, opacity 0.25s ease;
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
  margin-bottom: 30px;
}

.section-heading h2,
.about-copy h2,
.contact-copy h2 {
  margin: 0;
  font-size: clamp(2.3rem, 4vw, 4rem);
  line-height: 0.96;
  letter-spacing: -0.04em;
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
  margin: 0;
  transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
}

.gallery-item.large {
  grid-column: span 6;
}

.gallery-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
  border-color: rgba(17, 17, 17, 0.2);
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
  background: rgba(17, 17, 17, 0.58);
  color: var(--panel);
  letter-spacing: 0.09em;
  text-transform: uppercase;
  font-size: 0.68rem;
}

.works {
  background: #f0efee;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.work-row {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 32px;
  align-items: center;
  margin-bottom: 44px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid var(--line);
  padding: 18px;
}

.work-row:last-child {
  margin-bottom: 0;
}

.work-visual img {
  height: 420px;
  object-fit: cover;
}

.work-copy h3 {
  margin: 0 0 12px;
  font-size: 2rem;
}

.work-copy p {
  margin: 0 0 14px;
  color: var(--muted);
}

.text-link {
  display: inline-block;
  margin-top: 8px;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.poetry {
  background: var(--bg);
}

.poem-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.poem {
  padding: 26px 22px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.4);
  min-height: 200px;
  display: flex;
  align-items: center;
}

.poem p {
  margin: 0;
  font-size: 1.03rem;
  line-height: 1.9;
  color: var(--ink);
}

.about-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  align-items: center;
}

.about-copy p {
  margin-top: 18px;
  color: var(--muted);
}

.about-visual img {
  width: 100%;
  min-height: 520px;
  object-fit: cover;
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
}

.contact {
  background: #f0efee;
  border-top: 1px solid var(--line);
}

.contact-wrap {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 40px;
  align-items: start;
}

.contact-copy p {
  margin-top: 16px;
  color: var(--muted);
}

.contact-form {
  display: grid;
  gap: 16px;
  padding: 22px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.6);
  box-shadow: var(--shadow);
}

.contact-form label {
  display: grid;
  gap: 8px;
  font-size: 0.76rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--line);
  background: var(--panel);
  color: var(--ink);
  border-radius: 4px;
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
  z-index: 80;
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
  background: rgba(0, 0, 0, 0.78);
  backdrop-filter: blur(8px);
}

.lightbox-container {
  position: relative;
  z-index: 1;
  width: min(92vw, 980px);
  transform: scale(0.94) translateY(18px);
  opacity: 0;
  transition: transform 0.42s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.42s ease;
}

.lightbox.is-visible .lightbox-container {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.lightbox-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(17, 17, 17, 0.38);
  color: var(--panel);
  font-size: 1.5rem;
  cursor: pointer;
}

#lightboxImage {
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  background: rgba(17, 17, 17, 0.32);
}

.lightbox-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 18px 18px 24px;
  color: var(--panel);
  background: rgba(17, 17, 17, 0.5);
}

#lightboxCaption {
  margin: 0;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.7rem;
}

.lightbox-controls {
  display: flex;
  gap: 10px;
}

.lightbox-controls button {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--panel);
  border-radius: 999px;
  padding: 9px 14px;
  cursor: pointer;
}

@media (max-width: 980px) {
  .work-row,
  .about-grid,
  .contact-wrap {
    grid-template-columns: 1fr;
  }

  .poem-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
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
    background: rgba(243, 241, 239, 0.96);
    border: 1px solid var(--line);
    box-shadow: var(--shadow);
  }

  .main-nav.open {
    display: flex;
  }

  .main-nav a::after {
    display: none;
  }

  .hero {
    min-height: 520px;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .lightbox-container {
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

@media (max-width: 520px) {
  .hero h1 {
    font-size: 3.4rem;
  }

  .brand {
    font-size: 1.1rem;
  }

  .section-space {
    padding: 80px 0;
  }
}





































































































































































































































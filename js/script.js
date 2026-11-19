(function () {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavClose = document.getElementById('mobile-nav-close');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const pageNavButton = document.getElementById('page-nav-button');
  const mainContent = document.getElementById('main-content');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const getTheme = () => root.dataset.theme === 'light' ? 'light' : 'dark';

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    themeToggle?.setAttribute('aria-pressed', String(theme === 'light'));
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f1f3f7' : '#121212');
    renderParticles(theme, true);
  }

  themeToggle?.addEventListener('click', () => setTheme(getTheme() === 'dark' ? 'light' : 'dark'));

  function setMenu(open) {
    if (!menuToggle || !mobileNav || !mobileNavOverlay) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileNav.setAttribute('aria-hidden', String(!open));
    mobileNav.classList.toggle('open', open);
    mobileNavOverlay.hidden = !open;
    mobileNavOverlay.classList.toggle('open', open);
    body.classList.toggle('menu-open', open);
    if (open) mobileNavClose?.focus();
  }

  menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  mobileNavClose?.addEventListener('click', () => setMenu(false));
  mobileNavOverlay?.addEventListener('click', () => setMenu(false));
  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });

  function updatePageNav() {
    if (!pageNavButton || !mainContent) return;
    const pastHero = window.scrollY > Math.max(420, window.innerHeight * 0.55);
    pageNavButton.classList.toggle('visible', window.scrollY > 140);
    pageNavButton.classList.toggle('nav-up', pastHero);
    pageNavButton.setAttribute('aria-label', pastHero ? 'Scroll to top' : 'Scroll to main content');
    const label = pageNavButton.querySelector('.button-text');
    if (label) label.textContent = pastHero ? 'Top' : 'Content';
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { updatePageNav(); ticking = false; });
  }, { passive: true });

  pageNavButton?.addEventListener('click', () => {
    const target = pageNavButton.classList.contains('nav-up') ? 0 : mainContent.offsetTop - 82;
    window.scrollTo({ top: target, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  });

  function initReveal() {
    const items = document.querySelectorAll('[data-reveal]');
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('revealed'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
    items.forEach(item => observer.observe(item));
  }

  let particlesPromise;
  function ensureParticles() {
    if (window.tsParticles) return Promise.resolve();
    if (particlesPromise) return particlesPromise;
    particlesPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = body.dataset.particlesSrc;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    return particlesPromise;
  }

  async function renderParticles(theme, refresh) {
    if (reducedMotion.matches || !document.getElementById('tsparticles')) return;
    try {
      await ensureParticles();
      if (refresh && window.tsParticles?.domItem(0)) window.tsParticles.domItem(0).destroy();
      await window.tsParticles.load('tsparticles', {
        fullScreen: { enable: false },
        fpsLimit: 60,
        detectRetina: true,
        interactivity: {
          events: { onHover: { enable: true, mode: 'grab' }, resize: true },
          modes: { grab: { distance: 150, links: { opacity: 0.42 } } }
        },
        particles: {
          color: { value: theme === 'dark' ? '#FFD770' : '#3158c7' },
          links: { enable: true, color: theme === 'dark' ? '#4169e1' : '#6c83c9', distance: 145, opacity: 0.18, width: 1 },
          move: { enable: true, speed: 0.45, random: true, outModes: { default: 'out' } },
          number: { value: 44, density: { enable: true, area: 1000 } },
          opacity: { value: { min: 0.12, max: 0.38 } },
          size: { value: { min: 1, max: 2.4 } },
          shape: { type: 'circle' }
        }
      });
    } catch (error) {
      console.warn('Particle background skipped:', error);
    }
  }

  function initRuntime() {
    const runtime = document.getElementById('runtime_span');
    if (!runtime) return;
    const start = new Date('2025-05-15T23:42:33+09:00');
    const days = Math.max(0, Math.floor((Date.now() - start.getTime()) / 86400000));
    runtime.textContent = `Online for ${days.toLocaleString()} days`;
  }

  setTheme(getTheme());
  initReveal();
  initRuntime();
  updatePageNav();
}());

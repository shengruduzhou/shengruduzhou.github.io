(function () {
    'use strict';

    const root = document.documentElement;
    const body = document.body;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const navShell = document.getElementById('site-nav-shell');
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const pageNavButton = document.getElementById('page-nav-button');
    const mainContent = document.getElementById('main-content');
    const hero = document.getElementById('hero-header');

    const modalOverlay = document.getElementById('modal-overlay');
    const themeModal = document.getElementById('theme-modal');
    const goLightButton = document.getElementById('go-light-btn');
    const themeCancelButton = document.getElementById('theme-cancel-btn');
    const portfolioModal = document.getElementById('portfolio-modal');
    const portfolioConfirmButton = document.getElementById('portfolio-confirm-btn');
    const portfolioCancelButton = document.getElementById('portfolio-cancel-btn');
    const lottiePlayer = document.getElementById('lottie-warning-player');

    let activeModal = null;
    let lastFocusedElement = null;
    let scrollTicking = false;
    let particlesPromise = null;
    let particleContainer = null;
    let runtimeTimer = null;

    const getTheme = () => (root.dataset.theme === 'light' ? 'light' : 'dark');

    function setTheme(theme, options = {}) {
        const { persist = true, refreshParticles = true } = options;

        root.dataset.theme = theme;
        if (persist) localStorage.setItem('theme', theme);

        themeToggle?.setAttribute('aria-pressed', String(theme === 'light'));
        themeToggle?.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
        document.querySelector('meta[name="theme-color"]')?.setAttribute(
            'content',
            theme === 'light' ? '#f1f3f7' : '#121212'
        );

        if (refreshParticles) renderParticles(theme, true);
    }

    function getFocusableElements(container) {
        if (!container) return [];
        return Array.from(
            container.querySelectorAll(
                'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        );
    }

    function openModal(modal) {
        if (!modal || !modalOverlay) return;

        setMenu(false);
        if (activeModal && activeModal !== modal) closeModal(false);

        lastFocusedElement = document.activeElement;
        activeModal = modal;
        modal.classList.add('visible');
        modal.setAttribute('aria-hidden', 'false');
        modalOverlay.classList.add('visible');
        modalOverlay.setAttribute('aria-hidden', 'false');
        body.classList.add('modal-open');
        navShell?.classList.add('nav-pinned');

        const firstFocusable = getFocusableElements(modal)[0];
        window.setTimeout(() => firstFocusable?.focus(), 80);
    }

    function closeModal(restoreFocus = true) {
        if (!activeModal || !modalOverlay) return;

        const closingModal = activeModal;
        closingModal.classList.remove('visible');
        closingModal.setAttribute('aria-hidden', 'true');
        modalOverlay.classList.remove('visible');
        modalOverlay.setAttribute('aria-hidden', 'true');
        body.classList.remove('modal-open');
        navShell?.classList.remove('nav-pinned');
        activeModal = null;

        if (closingModal === portfolioModal && lottiePlayer?.stop) {
            lottiePlayer.stop();
        }

        if (restoreFocus && lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }
    }

    themeToggle?.addEventListener('click', () => {
        if (getTheme() === 'light') {
            setTheme('dark');
            return;
        }
        openModal(themeModal);
    });

    goLightButton?.addEventListener('click', () => {
        setTheme('light');
        closeModal(false);
        themeToggle?.focus();
    });

    themeCancelButton?.addEventListener('click', () => closeModal());

    document.querySelectorAll('[data-portfolio-link]').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            openModal(portfolioModal);
            if (lottiePlayer?.play) lottiePlayer.play();
        });
    });

    portfolioConfirmButton?.addEventListener('click', () => {
        const portfolioUrl = body.dataset.portfolioUrl;
        if (portfolioUrl) window.open(portfolioUrl, '_blank', 'noopener,noreferrer');
        closeModal(false);
        menuToggle?.focus();
    });

    portfolioCancelButton?.addEventListener('click', () => closeModal());
    modalOverlay?.addEventListener('click', () => closeModal());

    function setMenu(open) {
        if (!menuToggle || !mobileNav || !mobileNavOverlay) return;

        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        mobileNav.setAttribute('aria-hidden', String(!open));
        mobileNav.classList.toggle('open', open);
        mobileNavOverlay.hidden = false;
        mobileNavOverlay.classList.toggle('open', open);
        body.classList.toggle('menu-open', open);
        navShell?.classList.toggle('nav-pinned', open);

        if (open) {
            window.setTimeout(() => mobileNavClose?.focus(), 80);
        } else {
            window.setTimeout(() => {
                if (!mobileNavOverlay.classList.contains('open')) mobileNavOverlay.hidden = true;
            }, 300);
        }
    }

    menuToggle?.addEventListener('click', () => {
        setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    mobileNavClose?.addEventListener('click', () => {
        setMenu(false);
        menuToggle?.focus();
    });

    mobileNavOverlay?.addEventListener('click', () => setMenu(false));
    mobileNav?.querySelectorAll('a:not([data-portfolio-link])').forEach((link) => {
        link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (activeModal) closeModal();
            else if (menuToggle?.getAttribute('aria-expanded') === 'true') setMenu(false);
            return;
        }

        if (event.key !== 'Tab' || !activeModal) return;
        const focusable = getFocusableElements(activeModal);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    function updateScrollState() {
        const scrollY = window.scrollY;
        const pastHeroIntro = scrollY > 120;
        const pastHero = scrollY > Math.max(420, window.innerHeight * 0.55);

        navShell?.classList.toggle('nav-compact', pastHeroIntro);

        if (hero && !reducedMotion.matches && window.innerWidth > 900) {
            const parallax = Math.min(42, scrollY * 0.055);
            hero.style.setProperty('--hero-parallax', `${parallax}px`);
        }

        if (pageNavButton && mainContent) {
            pageNavButton.classList.toggle('visible', scrollY > 140);
            pageNavButton.classList.toggle('nav-up', pastHero);
            pageNavButton.setAttribute('aria-label', pastHero ? 'Scroll to top' : 'Scroll to main content');

            const label = pageNavButton.querySelector('.button-text');
            if (label) label.textContent = pastHero ? 'Top' : 'Content';
        }
    }

    function scheduleScrollUpdate() {
        if (scrollTicking) return;
        scrollTicking = true;

        window.requestAnimationFrame(() => {
            updateScrollState();
            scrollTicking = false;
        });
    }

    window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });
    window.addEventListener('resize', scheduleScrollUpdate, { passive: true });

    pageNavButton?.addEventListener('click', () => {
        if (!mainContent) return;
        const target = pageNavButton.classList.contains('nav-up') ? 0 : mainContent.offsetTop - 82;
        window.scrollTo({ top: target, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    });

    function initReveal() {
        const items = document.querySelectorAll('[data-reveal]');
        if (reducedMotion.matches || !('IntersectionObserver' in window)) {
            items.forEach((item) => item.classList.add('revealed'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

        items.forEach((item) => observer.observe(item));
    }

    function initAnimeEntrance() {
        if (reducedMotion.matches || !window.anime) return;

        window.anime.timeline({
            easing: 'easeOutExpo',
            duration: 850
        })
            .add({
                targets: '.site-nav-shell',
                opacity: [0, 1],
                duration: 500
            })
            .add({
                targets: '.hero-kicker',
                translateY: [18, 0],
                opacity: [0, 1]
            }, '-=300')
            .add({
                targets: '.hero-content h1',
                translateY: [34, 0],
                opacity: [0, 1],
                duration: 1000
            }, '-=650')
            .add({
                targets: '.hero-lead',
                translateY: [18, 0],
                opacity: [0, 1]
            }, '-=650')
            .add({
                targets: '.hero-actions .button',
                translateY: [16, 0],
                opacity: [0, 1],
                delay: window.anime.stagger(100),
                duration: 650
            }, '-=540');
    }

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

    function destroyParticles() {
        if (particleContainer?.destroy) particleContainer.destroy();
        particleContainer = null;
    }

    async function renderParticles(theme, refresh = false) {
        if (reducedMotion.matches || !document.getElementById('tsparticles')) return;

        try {
            await ensureParticles();
            if (refresh) destroyParticles();

            const isCompactScreen = window.matchMedia('(max-width: 700px)').matches;
            particleContainer = await window.tsParticles.load('tsparticles', {
                fullScreen: { enable: false },
                fpsLimit: 120,
                detectRetina: true,
                pauseOnBlur: true,
                pauseOnOutsideViewport: true,
                interactivity: {
                    events: {
                        onClick: { enable: true, mode: 'push' },
                        onHover: { enable: true, mode: 'grab' },
                        resize: true
                    },
                    modes: {
                        push: { quantity: 4 },
                        grab: {
                            distance: 200,
                            links: { opacity: 1 }
                        }
                    }
                },
                particles: {
                    color: { value: theme === 'dark' ? '#FFD770' : '#3158c7' },
                    links: {
                        enable: true,
                        color: theme === 'dark' ? '#4169e1' : '#17a2b8',
                        distance: 150,
                        opacity: 0.4,
                        width: 1
                    },
                    collisions: { enable: true },
                    move: {
                        enable: true,
                        direction: 'none',
                        random: true,
                        speed: 1,
                        straight: false,
                        outModes: { default: 'bounce' }
                    },
                    number: {
                        value: isCompactScreen ? 64 : 100,
                        density: { enable: true, area: 800 }
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 0.5,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    shape: { type: 'circle' },
                    size: {
                        value: { min: 1, max: 3 },
                        random: true
                    }
                }
            });
        } catch (error) {
            console.warn('Particle background skipped:', error);
        }
    }

    function formatRuntime(startDate, nowDate) {
        const totalSeconds = Math.max(0, Math.floor((nowDate.getTime() - startDate.getTime()) / 1000));
        const secondsPerDay = 86400;
        const secondsPerYear = Math.floor(365.2425 * secondsPerDay);

        const years = Math.floor(totalSeconds / secondsPerYear);
        let remainder = totalSeconds % secondsPerYear;
        const days = Math.floor(remainder / secondsPerDay);
        remainder %= secondsPerDay;
        const hours = Math.floor(remainder / 3600);
        remainder %= 3600;
        const minutes = Math.floor(remainder / 60);
        const seconds = remainder % 60;

        const pad = (value) => String(value).padStart(2, '0');
        return `RUN TIME · ${years}Y ${days}D ${pad(hours)}H ${pad(minutes)}M ${pad(seconds)}S`;
    }

    function updateRuntime() {
        const runtime = document.getElementById('runtime_span');
        if (!runtime) return;
        const start = new Date('2025-05-15T23:42:33+09:00');
        runtime.textContent = formatRuntime(start, new Date());
    }

    function startRuntime() {
        updateRuntime();
        if (runtimeTimer) window.clearInterval(runtimeTimer);
        runtimeTimer = window.setInterval(updateRuntime, 1000);
    }

    function stopRuntime() {
        if (!runtimeTimer) return;
        window.clearInterval(runtimeTimer);
        runtimeTimer = null;
    }

    function initRuntime() {
        startRuntime();
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopRuntime();
            else startRuntime();
        });
    }

    function formatVisitorCounter(id) {
        const element = document.getElementById(id);
        if (!element || !('MutationObserver' in window)) return;

        let formatting = false;
        const observer = new MutationObserver(() => {
            if (formatting) return;
            const digits = element.textContent.replace(/[^0-9]/g, '');
            if (!digits) return;

            const formatted = Number(digits).toLocaleString();
            if (element.textContent === formatted) return;

            formatting = true;
            element.textContent = formatted;
            formatting = false;
        });

        observer.observe(element, { childList: true, characterData: true, subtree: true });
    }

    function handleVisibilityForParticles() {
        if (!particleContainer) return;
        if (document.hidden && particleContainer.pause) particleContainer.pause();
        if (!document.hidden && particleContainer.play) particleContainer.play();
    }

    document.addEventListener('visibilitychange', handleVisibilityForParticles);

    reducedMotion.addEventListener?.('change', () => {
        if (reducedMotion.matches) destroyParticles();
        else renderParticles(getTheme(), true);
    });

    setTheme(getTheme(), { persist: false, refreshParticles: false });
    initReveal();
    initAnimeEntrance();
    initRuntime();
    formatVisitorCounter('busuanzi_site_uv');
    formatVisitorCounter('busuanzi_site_pv');
    updateScrollState();
    renderParticles(getTheme());
}());

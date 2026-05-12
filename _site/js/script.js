window.GeneralFunction = {
    homeLink: null,
    topPageLink: null,

    goToHomePage: function() {
        if (this.homeLink) {
            this.homeLink.addEventListener('click', () => {
                window.location.href = '../index.html';
            });
        } else {
            console.error('homeLink not initialized!');
        }
    },

    // 滚动到顶部
    scrollToTop: function() {
        if (this.topPageLink) {
            this.topPageLink.addEventListener('click', (e) => {
                e.preventDefault(); // 阻止默认的链接跳转
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // 平滑滚动到顶部
                });
            });
        } else {
            console.error('topPageLink not initialized!');
        }
    },

    init: function() {
        this.homeLink = document.getElementById('home-link');
        this.topPageLink = document.getElementById('top-page-link');

        this.goToHomePage();
        this.scrollToTop();
    }
};

(function() {
    function initNavButton() {
        const navButton = document.getElementById('page-nav-button');
        const buttonText = navButton?.querySelector('.button-text');
        const header = document.getElementById('hero-header');
        const mainContent = document.getElementById('main-content-wrapper');
        const footer = document.getElementById('page-footer');

        if (!navButton || !buttonText || !header || !mainContent || !footer) {
            console.error('Nav Button Error: Element Missing');
            return;
        }

        let isUp = false;

        function checkPosition() {
            const scrollY = window.scrollY;
            const headerBottom = header.offsetHeight;
            const footerTop = footer.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;
            
            const shouldBeUp = scrollY > headerBottom;

            if (shouldBeUp !== isUp) {
                isUp = shouldBeUp;
                if (isUp) {
                    navButton.classList.add('nav-up');
                    buttonText.textContent = 'Top to page';
                } else {
                    navButton.classList.remove('nav-up');
                    buttonText.textContent = 'To main content';
                }
            }

            if (footerTop < viewportHeight) {
                const overlap = viewportHeight - footerTop;
                navButton.style.transform = `translateY(-${overlap}px)`;
            } else {
                navButton.style.transform = 'translateY(0px)';
            }

            window.requestAnimationFrame(checkPosition);
        }

        navButton.addEventListener('click', () => {
            if (isUp) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        window.requestAnimationFrame(checkPosition);
    }

    window.addEventListener('load', initNavButton);
})();
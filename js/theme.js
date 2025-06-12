document.addEventListener('DOMContentLoaded', () => {
    const themeSwitchLabel = document.querySelector('.theme-switch');
    const themeCheckbox = document.getElementById('theme-checkbox');
    const htmlEl = document.documentElement;

    // Modal Theme elements
    const modal = document.getElementById('theme-modal');
    const overlay = document.getElementById('modal-overlay');
    const goLightBtn = document.getElementById('go-light-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    let currentTheme = localStorage.getItem('theme') || 'dark';

    const applyTheme = (theme) => {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeCheckbox.checked = (theme === 'light');
        currentTheme = theme; 
        
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: theme } }));
    };

    const showModal = () => {
        modal.classList.add('visible');
        overlay.classList.add('visible');
    };

    const hideModal = () => {
        modal.classList.remove('visible');
        overlay.classList.remove('visible');
    };


    //listen for a 'click' on the visible LABEL element.
    themeSwitchLabel.addEventListener('click', (e) => {
        if (currentTheme === 'dark') {
            e.preventDefault();
            showModal();
        }
    });

    // This listener reacts to the actual state change of the hidden checkbox.
    themeCheckbox.addEventListener('change', () => {
        if (!themeCheckbox.checked) {
            applyTheme('dark');
        }
    });


    // When the "Go Light" button is clicked in the modal.
    goLightBtn.addEventListener('click', () => {
        applyTheme('light');
        hideModal();
    });

    cancelBtn.addEventListener('click', hideModal);

    // Portfolio Enter Check
    const portfolioLink = document.querySelector('a[href="/portfolio.html"]');
    const portfolioModal = document.getElementById('portfolio-modal');
    const portfolioConfirmBtn = document.getElementById('portfolio-confirm-btn');
    const portfolioCancelBtn = document.getElementById('portfolio-cancel-btn');

    const showPortfolioModal = () => {
        portfolioModal.classList.add('visible');
        overlay.classList.add('visible');
    }

    const hidePortfolioModal = () => {
        portfolioModal.classList.remove('visible');
        overlay.classList.remove('visible');
    }

    if(portfolioLink) {
        portfolioLink.addEventListener('click', (e) => {
            e.preventDefault();
            showPortfolioModal();
        });
    }

    if(portfolioConfirmBtn) {
        portfolioConfirmBtn.addEventListener('click', () => {
            hidePortfolioModal();
            window.location.href = '/portfolio.html';
        });
    }

    if(portfolioCancelBtn) {
        portfolioCancelBtn.addEventListener('click', hidePortfolioModal);
    }

    overlay.addEventListener('click', () =>{
        hideModal();
        hidePortfolioModal();
    });

    applyTheme(currentTheme);
});
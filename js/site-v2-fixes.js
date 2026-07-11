(function () {
    'use strict';

    const toggle = document.getElementById('menu-toggle');
    const drawer = document.getElementById('mobile-nav');
    const overlay = document.getElementById('mobile-nav-overlay');

    if (!toggle || !drawer || !overlay) return;

    function syncDrawerState() {
        const open = toggle.getAttribute('aria-expanded') === 'true';

        drawer.classList.toggle('open', open);
        drawer.setAttribute('aria-hidden', String(!open));
        drawer.inert = !open;

        overlay.classList.toggle('open', open);
        overlay.setAttribute('aria-hidden', String(!open));

        if (open) {
            overlay.hidden = false;
        }
    }

    const observer = new MutationObserver(syncDrawerState);
    observer.observe(toggle, {
        attributes: true,
        attributeFilter: ['aria-expanded']
    });

    syncDrawerState();
}());

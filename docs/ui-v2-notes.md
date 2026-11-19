# UI V2 implementation notes

This iteration keeps the Jekyll content architecture and the existing left-profile/right-content layout while restoring the site's original interaction character.

## Behavior

- The primary navigation is full-width on the hero, contracts to a compact floating pill after scrolling, and expands on hover or keyboard focus.
- The hamburger drawer remains available on desktop and mobile.
- Tech-stack shield badges render inline and wrap horizontally.
- The original `Vision.jpg` hero background, high-density tsParticles behavior, Anime.js entrance sequence, parallax movement, Lottie portfolio dialog, theme dialog, drawer transitions, hover effects, and page-navigation control are retained.
- Runtime updates once per second only while the page is visible.
- Visitor counts are supplied by the existing Busuanzi client script and formatted after insertion.

## File organization

- `css/style.css`: base visual system from the first redesign.
- `css/site-v2.css`: readable, isolated overrides for this iteration.
- `js/site-v2.js`: pure front-end interaction controller.

No server-side application or API was introduced.

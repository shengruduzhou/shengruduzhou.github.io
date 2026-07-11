# UI V2 architecture

The site remains a static Jekyll site. Layout composition stays in `_layouts` and `_includes`; presentation overrides live in `css/site-v2.css`; browser interactions live in `js/site-v2.js`. This separation keeps posts and pages easy to extend without introducing a component framework or server runtime.

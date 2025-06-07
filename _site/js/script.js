// script
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
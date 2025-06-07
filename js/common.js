// 页面通用功能初始化
class PageInitializer {
    constructor() {
        this.startTime = new Date();
        this.init();
    }

    init() {
        this.initTimeDisplay();
        this.initDynamicBackground();
        this.initNavigationMenu();
        this.initPageAnimations();
        this.initCursorTrail();
    }

    // 动态背景
    initDynamicBackground() {
        if (!document.querySelector('.dynamic-background')) {
            const background = document.createElement('div');
            background.className = 'dynamic-background';
            document.body.insertBefore(background, document.body.firstChild);
        }
    }

    // 导航菜单动画
    initNavigationMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        if (!menuToggle || !navMenu) return;

        // 菜单遮罩
        let overlay = null;
        const content = document.querySelector('.content');
        let closeBtn = null;

        const openMenu = () => {
            menuToggle.classList.add('toggle');
            navMenu.classList.add('nav-active');
            // 添加遮罩，只覆盖内容区和菜单
            overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', closeMenu);
            // 添加关闭按钮
            if (!navMenu.querySelector('.menu-close')) {
                closeBtn = document.createElement('div');
                closeBtn.className = 'menu-close';
                closeBtn.innerHTML = '×';
                navMenu.appendChild(closeBtn);
                closeBtn.addEventListener('click', closeMenu);
            }
        };
        const closeMenu = () => {
            menuToggle.classList.remove('toggle');
            navMenu.classList.remove('nav-active');
            if (overlay) {
                overlay.removeEventListener('click', closeMenu);
                overlay.remove();
                overlay = null;
            }
            if (closeBtn) {
                closeBtn.removeEventListener('click', closeMenu);
                closeBtn.remove();
                closeBtn = null;
            }
        };

        menuToggle.addEventListener('click', () => {
            if (!navMenu.classList.contains('nav-active')) {
                openMenu();
            } else {
                closeMenu();
            }
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('nav-active')) {
                    closeMenu();
                }
            });
        });
    }

    // 页面动画和Vision装饰图插入
    initPageAnimations() {
        // Vision装饰图插入到.content第一个h2下方
        const content = document.querySelector('.content');
        if (content) {
            const h2 = content.querySelector('h2,h3');
            if (h2 && !content.querySelector('.anime-decoration')) {
                const visionDecoration = document.createElement('div');
                visionDecoration.className = 'anime-decoration vision-anim';
                if (h2.nextSibling) {
                    content.insertBefore(visionDecoration, h2.nextSibling);
                } else {
                    content.appendChild(visionDecoration);
                }
                // 动画：初始大图，缩小到正常尺寸
                setTimeout(() => {
                    visionDecoration.classList.add('vision-anim-end');
                }, 100);
                setTimeout(() => {
                    visionDecoration.classList.remove('vision-anim');
                }, 2100);
            }
        }
        // 其他动画
        anime({
            targets: '.sidebar',
            translateX: [-100, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo'
        });
        anime({
            targets: '.avatar',
            opacity: [0, 1],
            duration: 1500,
            easing: 'easeOutExpo',
            delay: 300
        });
        anime({
            targets: '.sidebar h1, .sidebar h2',
            translateY: [20, 0],
            opacity: [0, 1],
            delay: anime.stagger(200),
            duration: 1000,
            easing: 'easeOutExpo'
        });
        anime({
            targets: '.social-links a',
            scale: [0, 1],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutElastic(1, .5)'
        });
        anime({
            targets: '.content',
            translateX: [100, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: 500
        });
    }

    // 鼠标拖尾修正
    initCursorTrail() {
        let trail = document.querySelector('.cursor-trail');
        if (!trail) {
            trail = document.createElement('div');
            trail.className = 'cursor-trail';
            document.body.appendChild(trail);
        }
        document.addEventListener('mousemove', (e) => {
            // 考虑鼠标指针的偏移量，使拖尾完全居中
            const offsetX = trail.offsetWidth / 2;
            const offsetY = trail.offsetHeight / 2;
            trail.style.left = (e.clientX - offsetX) + 'px';
            trail.style.top = (e.clientY - offsetY) + 'px';
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new PageInitializer();
}); 
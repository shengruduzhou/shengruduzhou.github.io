// 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    // 侧边栏动画
    anime({
        targets: '.sidebar-inner',
        translateX: [-100, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo'
    });

    // 头像动画 - 修改为渐入效果
    anime({
        targets: '.avatar',
        opacity: [0, 1],
        duration: 1500,
        easing: 'easeOutExpo',
        delay: 300
    });

    // 标题动画
    anime({
        targets: '.sidebar h1, .sidebar h2',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(200),
        duration: 1000,
        easing: 'easeOutExpo'
    });

    // 社交链接动画
    anime({
        targets: '.social-links a',
        scale: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutElastic(1, .5)'
    });

    // 内容区域动画
    anime({
        targets: '.content-inner',
        translateX: [100, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 500
    });
});

// 文章卡片悬停动画
document.querySelectorAll('.post-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        anime({
            targets: item,
            translateY: -10,
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
            duration: 300,
            easing: 'easeOutQuad'
        });
    });

    item.addEventListener('mouseleave', () => {
        anime({
            targets: item,
            translateY: 0,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});

// 导航菜单动画
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
let overlay = null;
let closeBtn = null;

function createOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    return overlay;
}

function createCloseButton() {
    closeBtn = document.createElement('div');
    closeBtn.className = 'menu-close';
    closeBtn.innerHTML = '×';
    navMenu.appendChild(closeBtn);
    return closeBtn;
}

function openMenu() {
    menuToggle.classList.add('toggle');
    navMenu.classList.add('nav-active');

    overlay.addEventListener('click', closeMenu);
    closeBtn.addEventListener('click', closeMenu);
}

function closeMenu() {
    menuToggle.classList.remove('toggle');
    navMenu.classList.remove('nav-active');
}

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('toggle'); 
    if (!navMenu.classList.contains('nav-active')) {
        openMenu();
    } else {
        closeMenu();
    }
});

// 点击菜单项关闭菜单
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('nav-active')) {
            closeMenu();
        }
    });
});

// 滚动动画
window.addEventListener('scroll', () => {
    anime({
        targets: '.content',
        translateY: -window.scrollY * 0.1,
        duration: 1000,
        easing: 'easeOutQuad'
    });
});

// 鼠标跟随效果
let lastTrailTime = 0;
const trailInterval = 20;

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime < trailInterval) {
        return; 
    }
    lastTrailTime = now;

    const trailDot = document.createElement('div');
    trailDot.className = 'cursor-trail';
    trailDot.style.left = e.pageX + 'px';
    trailDot.style.top = e.pageY + 'px';
    document.body.appendChild(trailDot);

    anime({
        targets: trailDot,
        translateX: '-50%', 
        translateY: '-50%',
        scale: [1, 2.5],
        opacity: [1, 0],
        duration: 600,
        easing: 'easeOutExpo',
        complete: () => {
            trailDot.remove();
        }
    });
});
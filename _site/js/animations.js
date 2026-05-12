// 页面加载动画
function loadParticles(theme) {
    const options = {
      background: {
        color: {
          value: theme === 'dark' ? '#121212' : '#f0f2f5'
        }
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push'
          },
          onHover: {
            enable: true,
            mode: 'grab'
          },
          resize: true
        },
        modes: {
          push: {
            quantity: 4
          },
          grab: {
            distance: 200,
            links: {
              opacity: 1
            }
          }
        }
      },
      particles: {
        color: {
          value: theme === 'dark' ? '#FFD770' : '#007bff'
        },
        links: {
          color: theme === 'dark' ? '#4169e1' : '#17a2b8',
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1
        },
        collisions: {
            enable: true
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce'
          },
          random: true,
          speed: 1,
          straight: false
        },
        number: {
          density: {
            enable: true,
            area: 800
          },
          value: 100
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
        shape: {
          type: 'circle'
        },
        size: {
          value: { min: 1, max: 3 },
          random: true
        }
      },
      detectRetina: true
    };
    tsParticles.load('tsparticles', options);
}

document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    loadParticles(currentTheme);

    // Run time counter
    show_runtime();
    
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
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', closeMenu);
    }

    menuToggle.classList.add('toggle');
    navMenu.classList.add('nav-active');
    overlay.addEventListener('click', closeMenu);

    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });
}

function closeMenu() {
    menuToggle.classList.remove('toggle');
    navMenu.classList.remove('nav-active');
    if (overlay) {
        overlay.classList.remove('active');
    }

    setTimeout(() => {
        if (overlay) {
            overlay.remove();
            overlay = null; 
        }
    }, 150);
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

// 运行时间统计
function show_runtime() {
    const runtimeSpan = document.getElementById("runtime_span");
    if(!runtimeSpan) return;

    // 建站日期
    const siteCreationDate = new Date("2025-05-15T23:42:33+09:00"); 

    // 使用 setInterval 来每秒更新一次
    setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - siteCreationDate.getTime();

        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        runtimeSpan.innerHTML = `RUN TIME: ${years}Y${days}Days${hours}Hrs${minutes}Min${seconds}Sec`;
    }, 1000);
}

// listener for theme change event
document.addEventListener('themeChanged', (e) => {
    loadParticles(e.detail.theme); // Reload particles with the new theme
});
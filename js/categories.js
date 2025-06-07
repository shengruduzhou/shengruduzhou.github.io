// categories
document.addEventListener('DOMContentLoaded', function() {
    if (!window.GeneralFunction) window.GeneralFunction = {};
    const posts = window.__ALL_POSTS__ || [];
    // 自动统计所有分类
    const categoryMap = {};
    posts.forEach(post => {
        (post.categories || []).forEach(cat => {
            if (!categoryMap[cat]) categoryMap[cat] = 0;
            categoryMap[cat]++;
        });
    });
    const categories = Object.keys(categoryMap).map(name => ({
        name,
        count: categoryMap[name]
    }));

    Object.assign(GeneralFunction, {
        listContainer: null,
        categories,

        generateCategories: function() {
            if (GeneralFunction.listContainer && Array.isArray(GeneralFunction.categories)) {
                let listHTML = '';
                GeneralFunction.categories.forEach(category => {
                    listHTML += `
                        <div class="list-item category-item" data-category="${category.name}">
                            <a href="#" class="category-link">${category.name}</a>
                            <span>(${category.count})</span>
                            <div class="category-posts" style="display: none;"></div>
                        </div>
                    `;
                });
                GeneralFunction.listContainer.innerHTML = listHTML;
                this.attachCategoryEvents();
            } else {
                console.error('listContainer or categories not initialized!');
            }
        },

        attachCategoryEvents: function() {
            const categoryItems = document.querySelectorAll('.category-item');
            categoryItems.forEach(item => {
                const categoryLink = item.querySelector('.category-link');
                const categoryPosts = item.querySelector('.category-posts');
                
                categoryLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    const category = item.dataset.category;
                    
                    // 切换显示/隐藏
                    if (categoryPosts.style.display === 'none') {
                        // 获取该分类下的所有文章
                        const posts = window.__ALL_POSTS__.filter(post => 
                            post.categories && post.categories.includes(category)
                        );
                        
                        // 生成文章列表HTML
                        const postsHTML = posts.map(post => `
                            <div class="category-post-item">
                                <a href="${post.link}">${post.title}</a>
                                <span class="post-date">${post.date}</span>
                            </div>
                        `).join('');
                        
                        categoryPosts.innerHTML = postsHTML;
                        categoryPosts.style.display = 'block';
                    } else {
                        categoryPosts.style.display = 'none';
                    }
                });
            });
        },

        initCategories: function() {
            GeneralFunction.menuToggle = document.querySelector('.menu-toggle');
            GeneralFunction.navMenu = document.querySelector('.nav-menu');
            GeneralFunction.listContainer = document.querySelector('.list-container');
            GeneralFunction.generateCategories();
        }
    });
    GeneralFunction.initCategories();
});
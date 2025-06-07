// tags
document.addEventListener('DOMContentLoaded', function() {
    if (!window.GeneralFunction) window.GeneralFunction = {};
    const posts = window.__ALL_POSTS__ || [];
    // 自动统计所有标签
    const tagMap = {};
    posts.forEach(post => {
        (post.tags || []).forEach(tag => {
            if (!tagMap[tag]) tagMap[tag] = 0;
            tagMap[tag]++;
        });
    });
    const tags = Object.keys(tagMap).map(name => ({
        name,
        count: tagMap[name]
    }));

    Object.assign(GeneralFunction, {
        listContainer: null,
        tags,

        generateTags: function() {
            if (GeneralFunction.listContainer && Array.isArray(GeneralFunction.tags)) {
                let listHTML = '';
                GeneralFunction.tags.forEach(tag => {
                    listHTML += `
                        <div class="list-item tag-item" data-tag="${tag.name}">
                            <a href="#" class="tag-link">${tag.name}</a>
                            <span>(${tag.count})</span>
                            <div class="tag-posts" style="display: none;"></div>
                        </div>
                    `;
                });
                GeneralFunction.listContainer.innerHTML = listHTML;
                this.attachTagEvents();
            } else {
                console.error('listContainer or tags not initialized!');
            }
        },

        attachTagEvents: function() {
            const tagItems = document.querySelectorAll('.tag-item');
            tagItems.forEach(item => {
                const tagLink = item.querySelector('.tag-link');
                const tagPosts = item.querySelector('.tag-posts');
                
                tagLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    const tag = item.dataset.tag;
                    
                    // 切换显示/隐藏
                    if (tagPosts.style.display === 'none') {
                        // 获取该标签下的所有文章
                        const posts = window.__ALL_POSTS__.filter(post => 
                            post.tags && post.tags.includes(tag)
                        );
                        
                        // 生成文章列表HTML
                        const postsHTML = posts.map(post => `
                            <div class="tag-post-item">
                                <a href="${post.link}">${post.title}</a>
                                <span class="post-date">${post.date}</span>
                            </div>
                        `).join('');
                        
                        tagPosts.innerHTML = postsHTML;
                        tagPosts.style.display = 'block';
                    } else {
                        tagPosts.style.display = 'none';
                    }
                });
            });
        },

        initTags: function() {
            GeneralFunction.menuToggle = document.querySelector('.menu-toggle');
            GeneralFunction.navMenu = document.querySelector('.nav-menu');
            GeneralFunction.listContainer = document.querySelector('.list-container');
            GeneralFunction.generateTags();
        }
    });
    GeneralFunction.initTags();
});
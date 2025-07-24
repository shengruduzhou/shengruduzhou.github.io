// index & posts
document.addEventListener('DOMContentLoaded', function() {
    if (!window.GeneralFunction) window.GeneralFunction = {};

    Object.assign(window.GeneralFunction, {
        postsContainer: null,

        generatePosts: function() {
            const posts = window.__ALL_POSTS__ || [];
            if (this.postsContainer && Array.isArray(posts)) {
                let postsHTML = '';
                posts.forEach(post => {
                    const categoriesHTML = post.categories ?
                        `<div class="post-categories">
                            ${post.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                        </div>` : '';
                    const tagsHTML = post.tags ?
                        `<div class="post-tags">
                            ${post.tags.map(tag => `<span class="tag-tag">${tag}</span>`).join('')}
                        </div>` : '';
                    postsHTML += `
                        <div class="post-item">
                            <span class="post-date">${post.date}</span>
                            <h3 class="post-title"><a href="${post.link}">${post.title}</a></h3>
                            <p class="post-description">${post.description}</p>
                            ${categoriesHTML}
                            ${tagsHTML}
                        </div>
                    `;
                });
                this.postsContainer.innerHTML = postsHTML;
            }
        },

        initIndex: function() {
            this.menuToggle = document.querySelector('.menu-toggle');
            this.navMenu = document.querySelector('.nav-menu');
            this.homeLink = document.getElementById('home-link');
            this.postsContainer = document.querySelector('.posts-container');
            if (this.postsContainer) {
                this.generatePosts();
            }
        }
    });

    window.GeneralFunction.initIndex();
});
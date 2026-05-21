document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('websites-container');

    // Check if the element exists to avoid errors on other pages
    if (!container) return;

    // Check if categorized websites data is available
    if (typeof websitesData === 'undefined') {
        console.error('Projects data is missing or invalid.');
        container.innerHTML = '<p style="color:var(--text-secondary); text-align:center;">Failed to load projects. Please try again later.</p>';
        return;
    }

    // Function to render a single project card
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';

        const techTagsHtml = project.tech.slice(0, 4).map(t => `<span class="tech-tag">${t}</span>`).join('');
        const imageSrc = project.image || 'https://via.placeholder.com/600x400?text=No+Image';

        card.innerHTML = `
            <div class="card-image-container">
                <img src="${imageSrc}" alt="${project.title}" class="card-image" loading="lazy">
            </div>
            <div class="card-content">
                <h3 class="card-title">${project.title}</h3>
                <p class="card-desc">${project.description}</p>
                <div class="tech-tags">
                    ${techTagsHtml}
                    ${project.tech.length > 4 ? `<span class="tech-tag">+${project.tech.length - 4}</span>` : ''}
                </div>
                <div class="card-actions">
                    <a href="website-details.html?id=${project.id}" class="btn-details" aria-label="View details for ${project.title}">View Details</a>
                </div>
            </div>
        `;
        return card;
    }

    // Loop through each category and render its block
    Object.keys(websitesData).forEach(categoryKey => {
        const category = websitesData[categoryKey];

        // Create category block
        const categoryBlock = document.createElement('div');
        categoryBlock.className = 'category-block';

        // Category Header
        categoryBlock.innerHTML = `
            <h2 class="category-header">${category.title}</h2>
            <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 2rem;">${category.description}</p>
        `;

        // Create grid for this category
        const grid = document.createElement('div');
        grid.className = 'projects-grid';

        if (category.projects.length === 0) {
            grid.innerHTML = '<p style="color:var(--text-secondary); grid-column: 1/-1;">More projects coming soon!</p>';
        } else {
            category.projects.forEach(project => {
                grid.appendChild(createProjectCard(project));
            });
        }

        categoryBlock.appendChild(grid);
        container.appendChild(categoryBlock);
    });
});

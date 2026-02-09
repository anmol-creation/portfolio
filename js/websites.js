document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('projects-grid');

    // Check if the element exists to avoid errors on other pages
    if (!grid) return;

    // Check if websites data is available
    if (typeof websites === 'undefined' || !Array.isArray(websites)) {
        console.error('Projects data is missing or invalid.');
        grid.innerHTML = '<p style="color:var(--text-secondary); text-align:center; grid-column: 1/-1;">Failed to load projects. Please try again later.</p>';
        return;
    }

    // Render cards
    websites.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';

        // Generate tech tags HTML
        const techTagsHtml = project.tech.slice(0, 4).map(t => `<span class="tech-tag">${t}</span>`).join('');

        // Use a placeholder if image is missing
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

        grid.appendChild(card);
    });
});

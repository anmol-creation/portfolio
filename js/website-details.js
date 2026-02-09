document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('project-content');

    // Check if on details page
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');

    if (!idParam) {
        container.innerHTML = '<p class="error-msg" style="text-align:center; padding: 2rem;">Project ID not specified.</p>';
        return;
    }

    const projectId = parseInt(idParam, 10);

    if (typeof websites === 'undefined' || !Array.isArray(websites)) {
        console.error('Projects data is missing.');
        container.innerHTML = '<p class="error-msg" style="text-align:center; padding: 2rem;">Failed to load project data.</p>';
        return;
    }

    const project = websites.find(p => p.id === projectId);

    if (!project) {
        container.innerHTML = '<p class="error-msg" style="text-align:center; padding: 2rem;">Project not found.</p>';
        return;
    }

    // Update Page Title
    document.title = `${project.title} - anmolcreations`;

    // Render Content
    const featuresHtml = project.features ? project.features.map(f => `
        <li class="feature-item">
            <input type="checkbox" class="feature-checkbox" aria-label="Check feature ${f}">
            <span>${f}</span>
        </li>
    `).join('') : '';

    const techTagsHtml = project.tech ? project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('') : '';

    const performanceHtml = project.performance ? `
        <div class="info-block">
            <h3>Performance</h3>
            <div class="performance-stats" style="display:flex; gap:2rem;">
                <div class="stat-item">
                    <div class="stat-value" style="font-size:1.5rem; font-weight:700; color:var(--brand-accent);">${project.performance.score}</div>
                    <div class="stat-label" style="font-size:0.8rem; color:var(--text-secondary);">Score</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" style="font-size:1.5rem; font-weight:700; color:var(--brand-accent);">${project.performance.loadTime}</div>
                    <div class="stat-label" style="font-size:0.8rem; color:var(--text-secondary);">Load Time</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" style="font-size:1.5rem; font-weight:700; color:var(--brand-accent);">${project.performance.accessibility}</div>
                    <div class="stat-label" style="font-size:0.8rem; color:var(--text-secondary);">Accessibility</div>
                </div>
            </div>
        </div>
    ` : '';

    const testimonialsHtml = project.testimonials && project.testimonials.length > 0
        ? project.testimonials.map(t => `
            <div class="testimonial-card">
                <p class="testimonial-text">"${t.text}"</p>
                <p class="testimonial-author">- ${t.author}</p>
            </div>
        `).join('')
        : '';

    // Iframe URL - Use liveUrl or fallback
    // Note: Some sites might block iframe embedding (X-Frame-Options).
    // If blocked, we might want to show a message or image fallback.
    const iframeUrl = project.liveUrl;

    const htmlContent = `
        <div class="details-header mobile-only" style="display:none;">
            <h1 class="details-title">${project.title}</h1>
            <p class="details-subtitle">${project.description}</p>
        </div>

        <div class="preview-section">
            <div class="preview-controls">
                <button class="device-btn active" data-device="desktop">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                    Desktop
                </button>
                <button class="device-btn" data-device="tablet">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                    Tablet
                </button>
                <button class="device-btn" data-device="mobile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                    Mobile
                </button>
            </div>

            <div class="iframe-container desktop" id="iframe-wrapper">
                <div class="spinner-overlay" id="spinner-overlay">
                    <div class="spinner"></div>
                </div>
                <iframe src="${iframeUrl}" class="project-iframe" id="project-iframe" title="${project.title} Live Preview"></iframe>
            </div>
             <p style="text-align:center; font-size:0.8rem; color:var(--text-secondary); margin-top:0.5rem;">
                Note: Some websites may not support embedding. <a href="${project.liveUrl}" target="_blank" style="color:var(--brand-accent);">Open in new tab</a> if preview fails.
            </p>
        </div>

        <div class="info-section">
            <div class="details-header desktop-only">
                <h1 class="details-title">${project.title}</h1>
                <p class="details-subtitle">${project.description}</p>
            </div>

            ${project.client ? `
            <div class="info-block">
                <h3>Client</h3>
                <p style="color:var(--text-main);">${project.client}</p>
            </div>
            ` : ''}

            <div class="info-block">
                <h3>Technologies</h3>
                <div class="tech-tags">
                    ${techTagsHtml}
                </div>
            </div>

            ${performanceHtml}

            ${featuresHtml ? `
            <div class="info-block">
                <h3>Key Features</h3>
                <ul class="feature-list">
                    ${featuresHtml}
                </ul>
            </div>
            ` : ''}

            ${testimonialsHtml ? `
            <div class="info-block">
                <h3>Testimonials</h3>
                ${testimonialsHtml}
            </div>
            ` : ''}

            <div class="links-group">
                <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-link btn-primary">
                    View Live Site
                </a>
                ${project.githubUrl ? `
                <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-link btn-secondary">
                    View Code
                </a>
                ` : ''}
            </div>
        </div>
    `;

    container.innerHTML = htmlContent;
    container.className = 'details-grid'; // Use grid layout

    // Handle Iframe Loading
    const iframe = document.getElementById('project-iframe');
    const spinner = document.getElementById('spinner-overlay');

    if (iframe) {
        iframe.onload = () => {
            if (spinner) spinner.classList.add('hidden');
        };
        // Fallback for load event not firing or slow
        setTimeout(() => {
            if (spinner) spinner.classList.add('hidden');
        }, 3000);
    }

    // Handle Device Toggles
    const btns = document.querySelectorAll('.device-btn');
    const iframeWrapper = document.getElementById('iframe-wrapper');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update buttons
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update wrapper class
            const device = btn.dataset.device;
            iframeWrapper.className = `iframe-container ${device}`;
        });
    });
});

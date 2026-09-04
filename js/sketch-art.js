document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const featuredMasterpiece = document.getElementById('featured-masterpiece');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxMetadata = document.getElementById('lightbox-metadata');
    const lightboxClose = document.querySelector('.lightbox-close');
    const dimmerBtn = document.getElementById('spotlight-dimmer');
    const categoryPills = document.querySelectorAll('.category-pill');

    // CONFIGURATION
    const CLOUD_NAME = 'daxgt0qfj';

    // Memory constraint: "Gallery images must strictly NOT include watermarks... clean and visual-first."
    // Removed watermark transform from previous implementation.

    let allResources = []; // Store for filtering

    // Mock Metadata Generator (since Cloudinary JSON might just have IDs)
    function getMockMetadata(index) {
        const categories = ['spiritual', 'cinematic', 'anatomy', 'conceptual'];
        const mockTitles = [
            "Awakened Spirit (Lord Hanuman)", "Infinite Gaze (Cornea Reflection)",
            "Vignette of Wisdom (Lord Ganesha)", "Web-Slinger in Graphite",
            "Cosmic Harmony (Shiva & Parvati)", "Loyal Companion (Pug Anatomy)",
            "Shattered Perception", "The Apex Gaze"
        ];

        return {
            id: `AC-${String(index + 1).padStart(3, '0')}`,
            category: categories[index % categories.length],
            title: mockTitles[index % mockTitles.length] || `Study Opus ${index+1}`,
            subgenre: `${categories[index % categories.length].toUpperCase()} STUDY • 2024`,
            hours: `${Math.floor(Math.random() * 30 + 10)} Hours`,
            medium: "Charcoal & Graphite"
        };
    }

    // Function to load images from static JSON data
    async function loadSketches() {
        try {
            galleryGrid.innerHTML = '<div class="loading-state">Loading gallery archive...</div>';

            const response = await fetch('data/sketches.json');

            if (!response.ok) {
                if (response.status === 404) throw new Error('Gallery archive not found.');
                throw new Error(`Data error: ${response.status}`);
            }

            allResources = await response.json();

            if (!allResources || allResources.length === 0) {
                galleryGrid.innerHTML = '<div class="loading-state">Archive empty.</div>';
                featuredMasterpiece.innerHTML = '<div class="loading-state">No masterpiece found.</div>';
                return;
            }

            // Map resources to include mock metadata for UI purposes
            allResources = allResources.map((res, index) => ({
                ...res,
                meta: getMockMetadata(index)
            }));

            // Set Featured Masterpiece (first item or a specific one)
            renderFeatured(allResources[0]);

            // Render full gallery
            renderGallery(allResources);

        } catch (error) {
            console.error('Gallery Load Error:', error);
            galleryGrid.innerHTML = `<div class="error-state">Archive inaccessible: ${error.message}</div>`;
        }
    }

    // Render Featured Masterpiece
    function renderFeatured(res) {
        const fullUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto/${res.public_id}.${res.format}`;

        featuredMasterpiece.innerHTML = `
            <div class="masterpiece-canvas">
                <img src="${fullUrl}" alt="${res.meta.title}" class="masterpiece-img">
                <div class="masterpiece-actions">
                    <button class="action-btn" onclick="document.getElementById('lightbox-img').src='${fullUrl}'; document.getElementById('lightbox').classList.add('active');"><i class="fas fa-search-plus"></i> Examine Strokes</button>
                </div>
            </div>

            <div class="museum-plaque">
                <h3 class="plaque-title">${res.meta.title}</h3>
                <div class="plaque-meta">
                    <span>#${res.meta.id} • Opus 01</span>
                    <span>${res.meta.medium} on 250gsm Cold Press</span>
                    <span>HB, 2B, 6B, 8B & White Chalk</span>
                    <span>${res.meta.hours}</span>
                    <span>Archivally Fixed</span>
                </div>
                <div class="plaque-ctas">
                    <button class="cta-primary" onclick="window.scrollTo({top: document.querySelector('.exhibition-gallery').offsetTop, behavior: 'smooth'})">View Exhibition</button>
                    <button class="cta-secondary">Artist Monograph</button>
                </div>
            </div>
        `;
    }

    // Render Gallery Grid
    function renderGallery(resources) {
        galleryGrid.innerHTML = '';

        if (resources.length === 0) {
            galleryGrid.innerHTML = '<div class="loading-state">No studies found for this category.</div>';
            return;
        }

        resources.forEach((res, index) => {
            const thumbUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto,w_800/${res.public_id}.${res.format}`;
            const fullUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto/${res.public_id}.${res.format}`;

            const item = document.createElement('div');
            item.className = 'artwork-card';
            item.setAttribute('data-category', res.meta.category);

            item.innerHTML = `
                <div class="study-tag">#${res.meta.id}</div>
                <div class="artwork-canvas">
                    <img src="${thumbUrl}" alt="${res.meta.title}" class="artwork-img" loading="lazy">
                </div>
                <div class="artwork-label">
                    <div class="label-subgenre">${res.meta.subgenre}</div>
                    <h4 class="label-title">${res.meta.title}</h4>
                    <div class="label-details">
                        <span>${res.meta.hours}</span>
                        <span>${res.meta.medium}</span>
                    </div>
                </div>
            `;

            // Lightbox Click
            item.addEventListener('click', () => openLightbox(fullUrl, res.meta));
            galleryGrid.appendChild(item);
        });
    }

    // Filtering Logic
    categoryPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            // Update active state
            categoryPills.forEach(p => p.classList.remove('active'));
            e.target.classList.add('active');

            const filter = e.target.getAttribute('data-filter');

            if (filter === 'all') {
                renderGallery(allResources);
            } else {
                const filtered = allResources.filter(res => res.meta.category === filter);
                renderGallery(filtered);
            }
        });
    });

    // Spotlight Dimmer Logic
    dimmerBtn.addEventListener('click', () => {
        document.body.classList.toggle('spotlight-active');
        dimmerBtn.classList.toggle('active');
    });

    // Lightbox Logic
    function openLightbox(url, meta) {
        lightboxImg.src = url;
        lightboxMetadata.innerHTML = `
            <h3 class="serif-font" style="font-size:1.5rem; margin-bottom:0.5rem;">${meta.title}</h3>
            <p style="color:var(--text-muted); font-size:0.8rem;">#${meta.id} • ${meta.medium} • ${meta.hours}</p>
        `;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxMetadata.innerHTML = '';
        }, 300);
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Initialize
    loadSketches();
});

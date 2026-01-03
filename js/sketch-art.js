document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    // CONFIGURATION
    const CLOUD_NAME = 'daxgt0erj';

    // Function to load images from backend API
    async function loadSketches() {
        try {
            // Show loading state
            galleryGrid.innerHTML = '<div class="loading-state">Loading gallery...</div>';

            const response = await fetch('/api/sketches');

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const resources = await response.json();
            renderGallery(resources);

        } catch (error) {
            console.error('Gallery Load Error:', error);

            galleryGrid.innerHTML = `
                <div class="error-state">
                    <p>Unable to load gallery.</p>
                    <small style="color:var(--text-secondary)">
                        ${error.message}
                    </small>
                </div>
            `;
        }
    }

    // Render Images
    function renderGallery(resources) {
        galleryGrid.innerHTML = ''; // Clear loading state

        if (!resources || resources.length === 0) {
            galleryGrid.innerHTML = '<div class="loading-state">No sketches found in folder.</div>';
            return;
        }

        resources.forEach((res, index) => {
            // Construct URL using Cloudinary URL conventions
            // Format: https://res.cloudinary.com/<cloud_name>/image/upload/<transformations>/<public_id>.<format>
            const imageUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto,w_800/${res.public_id}.${res.format}`;
            const fullUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto/${res.public_id}.${res.format}`;

            const item = document.createElement('div');
            item.className = 'gallery-item';
            // Stagger animation
            item.style.animationDelay = `${index * 50}ms`;

            const img = document.createElement('img');
            img.className = 'gallery-img';
            img.src = imageUrl;
            img.alt = 'Sketch Art';
            img.loading = 'lazy';

            // Lightbox Click
            item.addEventListener('click', () => {
                openLightbox(fullUrl);
            });

            item.appendChild(img);
            galleryGrid.appendChild(item);
        });
    }

    // Lightbox Logic
    function openLightbox(url) {
        lightboxImg.src = url;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Initialize
    loadSketches();
});

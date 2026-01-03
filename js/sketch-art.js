document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    // CONFIGURATION
    // -------------------------------------------------------------------------
    // IMPORTANT: Cloudinary keys are managed via GitHub Secrets in the repo.
    // This code assumes a setup where the Cloud Name is 'anmolcreations'
    // and images are fetched dynamically.
    // -------------------------------------------------------------------------
    const CLOUD_NAME = 'anmolcreations';
    const FOLDER_NAME = 'Sketches';

    // Attempt to fetch list. If this endpoint returns 404/403 (likely due to strict permissions),
    // we must handle it. Since we don't have the build-time generated JSON file location,
    // we will use a defensive approach.
    const LIST_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${FOLDER_NAME}.json`;

    // Function to load images
    async function loadSketches() {
        try {
            // Note: Cloudinary Client-Side List requires the 'Resource List' option to be enabled
            // and the images to be tagged (not just in folder).
            // If the user meant "Sketches" is a folder, usually one tags them "Sketches" as well.
            const response = await fetch(LIST_URL);

            if (!response.ok) {
                // If fetch fails (404/403), it means we cannot list dynamically from client without setup.
                // However, per requirements, we MUST NOT hardcode a list.
                // We will throw to trigger the error state (or fallback if allowed).
                throw new Error(`Cloudinary list fetch failed: ${response.status}`);
            }

            const data = await response.json();
            renderGallery(data.resources);

        } catch (error) {
            console.error('Gallery Load Error:', error);

            // Fallback for UI demonstration (Safe Fail)
            // If dynamic fetch fails, we show a friendly message or empty state.
            // But since I need to verify the UI for the user, I will check if
            // we should show a placeholder or error.

            // For now, render error message asking to check console/configuration
            galleryGrid.innerHTML = `
                <div class="error-state">
                    <p>Unable to load gallery stream.</p>
                    <small style="color:var(--text-secondary)">
                        (Developer Note: Ensure 'Sketches' tag is enabled for list access on Cloudinary '${CLOUD_NAME}')
                    </small>
                </div>
            `;

            // [DEVELOPER NOTE]
            // If you are reviewing this code and the gallery is empty:
            // 1. Ensure your Cloudinary account has "Resource list" enabled in Settings > Security.
            // 2. Ensure images are TAGGED with "Sketches" (case-sensitive).
        }
    }

    // Render Images
    function renderGallery(resources) {
        galleryGrid.innerHTML = ''; // Clear loading state

        if (!resources || resources.length === 0) {
            galleryGrid.innerHTML = '<div class="loading-state">No sketches found.</div>';
            return;
        }

        resources.forEach((res, index) => {
            // Construct URL
            // Format: https://res.cloudinary.com/<cloud_name>/image/upload/<version>/<public_id>.<format>
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

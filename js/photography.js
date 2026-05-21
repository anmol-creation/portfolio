document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('photography-categories');

    // Toggle Elements
    const layoutToggle = document.getElementById('layout-toggle');
    const labelMixed = document.getElementById('label-mixed');
    const labelCategorized = document.getElementById('label-categorized');
    const mixedGallerySection = document.getElementById('mixed-gallery-section');
    const mixedGalleryGrid = document.getElementById('mixed-gallery-grid');

    // Lightbox Elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    // Categories Configuration
    const categories = [
        {
            id: 'portraits',
            title: 'Portraits',
            link: 'portraits.html',
            dataSource: 'data/portraits.json', // Will fetch real data
            isDummy: false
        },
        {
            id: 'nature',
            title: 'Nature & Landscapes',
            link: 'nature.html',
            dataSource: 'data/nature.json',
            isDummy: false
        },
        {
            id: 'street',
            title: 'Street Photography',
            link: 'street.html',
            dataSource: 'data/street.json',
            isDummy: false
        },
        {
            id: 'macro',
            title: 'Macro & Details',
            link: 'macro.html',
            dataSource: 'data/macro.json',
            isDummy: false
        },
        {
            id: 'events',
            title: 'Events & Weddings',
            link: 'events.html',
            dataSource: 'data/events.json',
            isDummy: false
        },
        {
            id: 'wildlife',
            title: 'Wildlife & Pets',
            link: 'wildlife.html',
            dataSource: 'data/wildlife.json',
            isDummy: false
        },
        {
            id: 'product',
            title: 'Product & Food',
            link: 'product.html',
            dataSource: 'data/product.json',
            isDummy: false
        }
    ];

    const CLOUD_NAME = 'daxgt0qfj';
    let allMixedResources = []; // Store all fetched data for the mixed view

    // Dummy Image Placeholders (Unsplash Source API)
    const dummyImages = {
        'nature': [
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80',
            'https://images.unsplash.com/photo-1444464666168-49b6288851cb?w=800&q=80',
            'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80',
            'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
            'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80'
        ],
        'street': [
            'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&q=80',
            'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80',
            'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=800&q=80',
            'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80',
            'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&q=80'
        ],
        'macro': [
            'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=800&q=80',
            'https://images.unsplash.com/photo-1507567794595-50e50d60d3fc?w=800&q=80',
            'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
            'https://images.unsplash.com/photo-1469122312224-c5846569feb1?w=800&q=80',
            'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?w=800&q=80'
        ],
        'events': [
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
            'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
            'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
            'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80',
            'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80'
        ],
        'wildlife': [
            'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&q=80',
            'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80',
            'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80',
            'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&q=80',
            'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=800&q=80'
        ],
        'product': [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80'
        ]
    };

    // Build the UI for a single row
    function createCategoryRow(category, images) {
        if (!images || images.length === 0) return;

        const rowDiv = document.createElement('div');
        rowDiv.className = 'photo-category-row';

        const headerDiv = document.createElement('div');
        headerDiv.className = 'photo-category-header';

        const titleLink = document.createElement('a');
        titleLink.href = category.link;
        titleLink.className = 'photo-category-title';
        titleLink.textContent = category.title;

        const viewAllLink = document.createElement('a');
        viewAllLink.href = category.link;
        viewAllLink.className = 'photo-category-view-all';
        viewAllLink.textContent = 'View All >';

        headerDiv.appendChild(titleLink);
        // Only show "View All" if it's not a dummy link
        if (category.link !== '#') {
            headerDiv.appendChild(viewAllLink);
        }
        rowDiv.appendChild(headerDiv);

        const scrollContainer = document.createElement('div');
        scrollContainer.className = 'photo-scroll-container';

        images.forEach(imgData => {
            const card = document.createElement('div');
            card.className = 'photo-card';

            const img = document.createElement('img');
            img.loading = 'lazy';

            if (category.isDummy) {
                img.src = imgData; // Direct URL for dummy
                img.dataset.full = imgData.replace('w=800', 'w=1600'); // Higher res for lightbox
            } else {
                img.src = imgData.url; // Cloudinary URL
                img.dataset.full = imgData.url.replace('/w_800,q_auto,f_auto/', '/q_auto,f_auto/'); // Adjust transformation for full size
            }
            img.alt = category.title + ' Image';

            // Lightbox Event
            card.addEventListener('click', () => openLightbox(img.dataset.full));

            card.appendChild(img);
            scrollContainer.appendChild(card);
        });

        rowDiv.appendChild(scrollContainer);
        categoriesContainer.appendChild(rowDiv);
    }

    // Fetch and render data
    async function initDashboard() {
        for (const cat of categories) {
            if (cat.isDummy) {
                createCategoryRow(cat, dummyImages[cat.id]);
                // Add dummy images to mixed pool
                const formattedDummies = dummyImages[cat.id].map(url => ({
                    isDummy: true,
                    url: url,
                    fullUrl: url.replace('w=800', 'w=1600')
                }));
                allMixedResources = allMixedResources.concat(formattedDummies);
            } else {
                try {
                    const response = await fetch(cat.dataSource);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();

                    // Add real images to mixed pool
                    const formattedReal = data.map(res => ({
                        isDummy: false,
                        url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto,w_800/${res.public_id}.${res.format}`,
                        fullUrl: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto/${res.public_id}.${res.format}`
                    }));
                    allMixedResources = allMixedResources.concat(formattedReal);

                    // Take up to 10 images for the horizontal scroll
                    createCategoryRow(cat, data.slice(0, 10));
                } catch (error) {
                    console.error(`Error loading data for ${cat.title}:`, error);
                }
            }
        }

        // Shuffle the mixed resources to create a truly mixed pinterest view
        shuffleArray(allMixedResources);
    }

    // Render Mixed View (Pinterest Style)
    function renderMixedGallery() {
        mixedGalleryGrid.innerHTML = ''; // Clear loading state

        console.log("allMixedResources length: ", allMixedResources.length); // DEBUG

        if (!allMixedResources || allMixedResources.length === 0) {
            mixedGalleryGrid.innerHTML = '<div class="loading-state">No photos found.</div>';
            return;
        }

        allMixedResources.forEach((res, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            // Stagger animation
            item.style.animationDelay = `${(index % 10) * 50}ms`;

            const img = document.createElement('img');
            img.className = 'gallery-img';
            img.src = res.url;
            img.alt = 'Photography Mixed Image';
            img.loading = 'lazy';

            // Lightbox Click
            item.addEventListener('click', () => {
                openLightbox(res.fullUrl);
            });

            item.appendChild(img);
            mixedGalleryGrid.appendChild(item);
        });
    }

    // Helper: Fisher-Yates Shuffle
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Toggle Listener
    layoutToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            // Switch to Mixed View
            labelCategorized.classList.remove('active');
            labelMixed.classList.add('active');
            categoriesContainer.style.display = 'none';
            mixedGallerySection.style.display = 'block';

            // Render if empty
            if (mixedGalleryGrid.children.length <= 1) { // includes loading div
                renderMixedGallery();
            }
        } else {
            // Switch to Categorized View
            labelMixed.classList.remove('active');
            labelCategorized.classList.add('active');
            mixedGallerySection.style.display = 'none';
            categoriesContainer.style.display = 'block';
        }
    });

    // Lightbox Logic
    function openLightbox(imgSrc) {
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300); // Wait for transition
    }

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Start
    initDashboard();
});
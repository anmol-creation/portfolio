document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('photography-categories');

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
            link: '#',
            dataSource: null,
            isDummy: true
        },
        {
            id: 'street',
            title: 'Street Photography',
            link: '#',
            dataSource: null,
            isDummy: true
        },
        {
            id: 'macro',
            title: 'Macro & Details',
            link: '#',
            dataSource: null,
            isDummy: true
        }
    ];

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
            } else {
                try {
                    const response = await fetch(cat.dataSource);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();
                    // Take up to 10 images for the horizontal scroll
                    createCategoryRow(cat, data.slice(0, 10));
                } catch (error) {
                    console.error(`Error loading data for ${cat.title}:`, error);
                }
            }
        }
    }

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
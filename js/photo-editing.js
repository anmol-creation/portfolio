document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('editing-categories');

    // Lightbox Elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    // Categories Configuration for Photo Editing
    const categories = [
        { id: 'color-grading', title: 'Color Grading', link: '#', dataSource: null, isDummy: true },
        { id: 'creative-edits', title: 'Creative Edits', link: '#', dataSource: null, isDummy: true },
        { id: 'ai-edits', title: 'AI Edits', link: '#', dataSource: null, isDummy: true },
        { id: 'portraits', title: 'Portraits', link: 'portraits.html', dataSource: null, isDummy: true },
        { id: 'nature', title: 'Nature & Landscapes', link: 'nature.html', dataSource: null, isDummy: true },
        { id: 'street', title: 'Street Photography', link: 'street.html', dataSource: null, isDummy: true },
        { id: 'events', title: 'Events & Weddings', link: 'events.html', dataSource: null, isDummy: true },
        { id: 'wildlife', title: 'Wildlife & Pets', link: 'wildlife.html', dataSource: null, isDummy: true },
        { id: 'product', title: 'Product & Food', link: 'product.html', dataSource: null, isDummy: true },
        { id: 'macro', title: 'Macro & Details', link: 'macro.html', dataSource: null, isDummy: true }
    ];

    // Dummy Image Placeholders (Unsplash Source API)
    // Using slightly different keywords/images from the photography page to fit the editing context better where possible.
    const dummyImages = {
        'color-grading': [
            'https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&q=80',
            'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80',
            'https://images.unsplash.com/photo-1514315384763-ba401779410f?w=800&q=80',
            'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&q=80',
            'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80'
        ],
        'creative-edits': [
            'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80',
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
            'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=800&q=80',
            'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80',
            'https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?w=800&q=80'
        ],
        'ai-edits': [
            'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
            'https://images.unsplash.com/photo-1675271591211-126ad94e495d?w=800&q=80',
            'https://images.unsplash.com/photo-1682687982501-1e58f8100c8b?w=800&q=80',
            'https://images.unsplash.com/photo-1683009427041-d810728a7cb6?w=800&q=80',
            'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&q=80'
        ],
        'portraits': [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
            'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800&q=80'
        ],
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
        ],
        'macro': [
            'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=800&q=80',
            'https://images.unsplash.com/photo-1507567794595-50e50d60d3fc?w=800&q=80',
            'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
            'https://images.unsplash.com/photo-1469122312224-c5846569feb1?w=800&q=80',
            'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?w=800&q=80'
        ]
    };

    // Build the UI for a single row (Reusing logic from photography.js)
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
                img.src = imgData.url; // Cloudinary URL format fallback
                img.dataset.full = imgData.url.replace('/w_800,q_auto,f_auto/', '/q_auto,f_auto/');
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
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
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
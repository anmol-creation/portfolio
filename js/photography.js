document.addEventListener('DOMContentLoaded', () => {
    // Cloudinary setup
    const CLOUD_NAME = 'daxgt0qfj'; // Use standard if env isn't passed, though frontend shouldn't need secret

    // We will dynamically fetch these files and construct botanicalData
    const dataSources = [
        { id: 'nature', title: 'Nature & Landscapes', file: 'data/nature.json', cat: 'Nature' },
        { id: 'macro', title: 'Macro & Details', file: 'data/macro.json', cat: 'Macro' },
        { id: 'portraits', title: 'Portraits & Subjects', file: 'data/portraits.json', cat: 'Portraits' },
        { id: 'wildlife', title: 'Wildlife & Pets', file: 'data/wildlife.json', cat: 'Wildlife' },
        { id: 'street', title: 'Street & Urban', file: 'data/street.json', cat: 'Street' },
        { id: 'events', title: 'Events & Culture', file: 'data/events.json', cat: 'Events' },
        { id: 'product', title: 'Products & Objects', file: 'data/product.json', cat: 'Products' }
    ];

    let botanicalData = [];

    // --- DOM ELEMENTS ---
    const btnGrid = document.getElementById('btn-grid');
    const btnBiomes = document.getElementById('btn-biomes');
    const viewGrid = document.getElementById('view-grid');
    const viewBiomes = document.getElementById('view-biomes');
    const gridContainer = document.getElementById('herbarium-grid');
    const biomesContainer = document.getElementById('biomes-container');
    const selectSpecimen = document.getElementById('specimen-select');

    // Lightbox
    const lightbox = document.getElementById('botanical-lightbox');
    const lightboxImg = document.getElementById('b-lightbox-img');
    const lightboxMeta = document.getElementById('b-lightbox-meta');
    const lightboxClose = document.querySelector('.b-lightbox-close');

    // --- FETCH DATA ---
    async function loadCloudinaryData() {
        for (const source of dataSources) {
            try {
                const response = await fetch(source.file);
                if (!response.ok) {
                    console.warn(`Could not load ${source.file}`);
                    continue;
                }
                const data = await response.json();

                // Map Cloudinary response to Botanical Data format
                data.forEach((item, index) => {
                    const id = `#${source.id.toUpperCase().substring(0,3)}-${String(index + 1).padStart(2, '0')}`;

                    const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto,w_800/${item.public_id}.${item.format}`;
                    const fullUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto/${item.public_id}.${item.format}`;

                    // Format names from public_id or display_name
                    let title = item.display_name || item.public_id.split('/').pop();
                    title = title.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // Capitalize words

                    botanicalData.push({
                        id: id,
                        cat: source.title,
                        title: title,
                        common: item.sub_category && item.sub_category !== 'Uncategorized' ? item.sub_category : source.cat,
                        exif: `${item.width}x${item.height} • ${item.format.toUpperCase()}`, // fallback exif
                        url: url,
                        fullUrl: fullUrl
                    });
                });
            } catch (error) {
                console.error(`Error parsing ${source.file}:`, error);
            }
        }

        // Shuffle if you want mixed, or keep categorized. Since we have biomes which groups by category,
        // and grid which mixes, we will shuffle the overall array for the grid.
        renderGrid();
        renderBiomes();
    }

    // Helper: Fisher-Yates Shuffle
    function shuffleArray(array) {
        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // --- RENDER FUNCTIONS ---

    function renderGrid() {
        gridContainer.innerHTML = '';

        if (botanicalData.length === 0) {
             gridContainer.innerHTML = '<p style="color:var(--b-text-secondary); padding: 2rem;">No specimens found. Please check data source.</p>';
             return;
        }

        const shuffledData = shuffleArray(botanicalData);

        shuffledData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'h-card';
            card.innerHTML = `
                <div class="h-card-top">
                    <span class="specimen-code">${item.id}</span>
                    <span class="specimen-cat">${item.cat}</span>
                </div>
                <div class="h-img-container">
                    <img src="${item.url}" alt="${item.title}" loading="lazy">
                </div>
                <div class="h-card-bottom">
                    <span class="h-exif">${item.exif}</span>
                    <h3 class="h-title">${item.title}</h3>
                    <span class="h-common">${item.common}</span>
                </div>
            `;

            // Add Lightbox Event
            card.addEventListener('click', () => openLightbox(item));
            gridContainer.appendChild(card);

            // Populate Form Select
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = `${item.id} - ${item.title}`;
            if(selectSpecimen) selectSpecimen.appendChild(option);
        });
    }

    function renderBiomes() {
        biomesContainer.innerHTML = '';

        // Group by Category (using dataSources order)
        const categories = dataSources.map(s => s.title);

        categories.forEach(cat => {
            const itemsInCat = botanicalData.filter(i => i.cat === cat);

            if (itemsInCat.length === 0) return;

            const row = document.createElement('div');
            row.className = 'biome-row';

            row.innerHTML = `
                <h3>${cat} • <span style="font-size: 0.9rem; color: var(--b-text-secondary); font-family: var(--b-font-ui); font-style: normal;">${itemsInCat.length} Specimens</span></h3>
                <div class="biome-carousel">
                    ${itemsInCat.map(item => `
                        <div class="biome-card" data-id="${item.id}">
                            <img src="${item.url}" alt="${item.title}" loading="lazy">
                            <div class="biome-card-overlay">
                                <h4>${item.title}</h4>
                                <span>${item.id}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            biomesContainer.appendChild(row);
        });

        // Add Lightbox Event to Biome Cards
        document.querySelectorAll('.biome-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                const item = botanicalData.find(i => i.id === id);
                if(item) openLightbox(item);
            });
        });
    }

    // --- VIEW CONTROLLER LOGIC ---
    function switchView(view) {
        if (view === 'grid') {
            btnGrid.classList.add('active');
            btnBiomes.classList.remove('active');
            viewGrid.classList.add('active');
            viewGrid.classList.remove('hidden');
            viewBiomes.classList.remove('active');
            viewBiomes.classList.add('hidden');

            // Update mobile bottom nav active state visually
            document.querySelectorAll('.bottom-tab').forEach(t => t.classList.remove('active'));
            document.querySelector('.bottom-tab[href="#gallery-container"]').classList.add('active');

        } else if (view === 'biomes') {
            btnBiomes.classList.add('active');
            btnGrid.classList.remove('active');
            viewBiomes.classList.add('active');
            viewBiomes.classList.remove('hidden');
            viewGrid.classList.remove('active');
            viewGrid.classList.add('hidden');

            // Update mobile bottom nav active state visually
            document.querySelectorAll('.bottom-tab').forEach(t => t.classList.remove('active'));
            document.querySelector('.bottom-tab[href="#biomes"]').classList.add('active');
        }
    }

    if(btnGrid && btnBiomes) {
        btnGrid.addEventListener('click', () => switchView('grid'));
        btnBiomes.addEventListener('click', () => switchView('biomes'));
    }

    // --- LIGHTBOX LOGIC ---
    function openLightbox(item) {
        lightboxImg.src = item.fullUrl; // Load higher res
        lightboxMeta.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.id} • ${item.exif}</p>
        `;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // Inspection button on Hero
    const inspectBtn = document.querySelector('.btn-inspect');
    if (inspectBtn) {
        inspectBtn.addEventListener('click', () => {
             // Let's use the first available data item or a fallback
             const heroItem = botanicalData.length > 0 ? botanicalData[0] : null;

             if (heroItem) {
                 openLightbox(heroItem);
             } else {
                 // Fallback if data not loaded
                 openLightbox({
                     fullUrl: document.querySelector('.hero-img').src,
                     title: 'The Dew Sphere & Micro Wanderer',
                     id: '#NAT-00',
                     exif: '90mm Macro • f/2.8 • 1/320s • ISO 100'
                 });
             }
        });
    }

    // --- INITIALIZE ---
    loadCloudinaryData();
});

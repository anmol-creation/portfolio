document.addEventListener('DOMContentLoaded', () => {

    // --- DATA: 14 Photographic Studies ---
    const botanicalData = [
        { id: '#NAT-01', cat: 'Flora & Petals', title: 'Magenta Moss-Rose', common: 'Portulaca Grandiflora', exif: '90mm • f/2.8 • 1/400s • Morning Sunlight', url: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=800&q=80' },
        { id: '#NAT-02', cat: 'Flora & Petals', title: 'Madagascar Periwinkle', common: 'Catharanthus Roseus', exif: 'Macro • f/3.2 • 1/640s • High-Key', url: 'https://images.unsplash.com/photo-1507567794595-50e50d60d3fc?w=800&q=80' },
        { id: '#NAT-03', cat: 'Flora & Petals', title: 'Madhumalti Creeper', common: 'Combretum Indicum', exif: '50mm • f/2.2 • Dappled Twilight', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80' },
        { id: '#NAT-04', cat: 'Dew Meniscus & Macro', title: 'Jade Dew Constellation', common: 'Crassula Ovata Drops', exif: '90mm • f/4.0 • 1/200s • Morning Dew', url: 'https://images.unsplash.com/photo-1469122312224-c5846569feb1?w=800&q=80' },
        { id: '#NAT-05', cat: 'Dew Meniscus & Macro', title: 'Radial Seed Geometries', common: 'Fibonacci Pappus Sphere', exif: 'f/2.8 • 1/800s • Specular Ambient', url: 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?w=800&q=80' },
        { id: '#NAT-06', cat: 'Sacred Herbal & Understory', title: 'Secret Forest Petal', common: 'Micro Calyx in Peat Soil', exif: 'f/2.0 • 1/250s • Forest Floor Humus', url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80' },
        { id: '#NAT-07', cat: 'Canopy & Celestial Sky', title: 'Twilight Canopy Arch', common: 'Crescent Moon Silhouette', exif: '35mm • f/4.0 • Nautical Dusk', url: 'https://images.unsplash.com/photo-1444464666168-49b6288851cb?w=800&q=80' },
        { id: '#NAT-08', cat: 'Sacred Herbal & Understory', title: 'Sacred Krishna Tulsi', common: 'Ocimum Sanctum Nocturne', exif: 'f/1.8 • 1/60s • ISO 400 • Midnight Starlight', url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80' },
        { id: '#NAT-09', cat: 'Sacred Herbal & Understory', title: 'Tender Murraya Sapling', common: 'Murraya Koenigii in Clay Pot', exif: 'f/2.4 • 1/500s • Morning Terracotta', url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80' },
        { id: '#NAT-10', cat: 'Dew Meniscus & Macro', title: 'Wild Groundcover Gloss', common: 'Oxalis & Forest Clover', exif: 'f/2.8 • 1/350s • Dewfall Atmosphere', url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80' },
        { id: '#NAT-11', cat: 'Canopy & Celestial Sky', title: 'Azure Sky & Cumulus', common: 'Stratospheric Vapor Motion', exif: '24mm • f/8.0 • High Noon Radiance', url: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&q=80' },
        { id: '#NAT-12', cat: 'Canopy & Celestial Sky', title: 'Indigo Horizon Bloom', common: 'Skyward Solitary Calyx', exif: 'f/3.5 • 1/1000s • Daylight Vault', url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80' },
        { id: '#NAT-13', cat: 'Dew Meniscus & Macro', title: 'Tulsi Deep Venation', common: 'Nocturnal Anthocyanin Stem', exif: 'f/1.8 • 1/45s • Night Humus', url: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=800&q=80' },
        { id: '#NAT-14', cat: 'Flora & Petals', title: 'Portulaca Corolla Core', common: 'Sun Rose Fibonacci Stamen', exif: 'f/2.8 • 1/600s • Diffused Solar', url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80' }
    ];

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

    // --- RENDER FUNCTIONS ---

    function renderGrid() {
        gridContainer.innerHTML = '';
        botanicalData.forEach(item => {
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

        // Group by Category
        const categories = [...new Set(botanicalData.map(item => item.cat))];

        categories.forEach(cat => {
            const itemsInCat = botanicalData.filter(i => i.cat === cat);

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

    btnGrid.addEventListener('click', () => switchView('grid'));
    btnBiomes.addEventListener('click', () => switchView('biomes'));

    // --- LIGHTBOX LOGIC ---
    function openLightbox(item) {
        lightboxImg.src = item.url.replace('w=800', 'w=1600'); // Load higher res
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

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // Inspection button on Hero
    document.querySelector('.btn-inspect').addEventListener('click', () => {
         const heroItem = botanicalData[0]; // #NAT-01 fallback or specific
         openLightbox({
             url: document.querySelector('.hero-img').src,
             title: 'The Dew Sphere & Micro Wanderer',
             id: '#NAT-00',
             exif: '90mm Macro • f/2.8 • 1/320s • ISO 100'
         });
    });

    // --- INITIALIZE ---
    renderGrid();
    renderBiomes();
});

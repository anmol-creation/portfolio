document.addEventListener('DOMContentLoaded', async () => {
    // Define the categories and their corresponding data sources
    const categories = {
        'sketch-art': { json: 'data/sketches.json', defaultImages: [] },
        'digital-art': { json: 'data/digital_art.json', defaultImages: [] },
        'photography': { json: 'data/portraits.json', defaultImages: [] }, // Using portraits as sample for photography
        'photo-editing': { json: 'data/portraits.json', defaultImages: [] }, // Using portraits as sample
        'banners': { json: 'data/banners.json', defaultImages: [] },
        'posters': { json: 'data/posters.json', defaultImages: [] },
        'logos': { json: 'data/logos.json', defaultImages: [] },
        'visiting-cards': { json: 'data/visiting_cards.json', defaultImages: [] }
    };

    // Default fallback images in case JSON fetch fails or is empty
    const defaultPlaceholder = "https://res.cloudinary.com/daxgt0qfj/image/upload/v1766133672/s2_oebpgx.jpg";

    async function fetchImages(categoryKey) {
        try {
            const response = await fetch(categories[categoryKey].json);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            if (data && data.length > 0) {
                 // Get up to 6 images for the reel
                 let images = data.slice(0, 6).map(item => {
                     // apply Cloudinary transformations for thumbnails as per memory
                     const urlParts = item.secure_url.split('/upload/');
                     return `${urlParts[0]}/upload/w_400,q_auto,f_auto/${urlParts[1]}`;
                 });
                 // If less than 6 images, repeat the array until it has at least 6
                 while (images.length < 6) {
                     images = images.concat(images);
                 }
                 return images.slice(0, 6);
            }
        } catch (error) {
            console.warn(`Failed to load JSON for ${categoryKey}, using defaults.`, error);
        }
        // Fallback array of 6 placeholders
        return Array(6).fill(defaultPlaceholder);
    }

    // Process all cards
    const cards = document.querySelectorAll('.sub-card');

    for (const card of cards) {
        // We'll use the href to identify the category key (e.g. 'sketch-art.html' -> 'sketch-art')
        const href = card.getAttribute('href');
        if (!href || href === '#') continue; // Skip placeholders for now if any

        const categoryKey = href.replace('.html', '');

        // Setup HTML structure inside the card if it's one of our known categories
        if (categories[categoryKey]) {
            const titleSpan = card.querySelector('.sub-card-title');
            const titleText = titleSpan ? titleSpan.textContent : '';

            // Clear current content
            card.innerHTML = '';

            // Create title container
            const titleContainer = document.createElement('div');
            titleContainer.className = 'card-title-container';
            const titleEl = document.createElement('span');
            titleEl.className = 'sub-card-title';
            titleEl.textContent = titleText;
            titleContainer.appendChild(titleEl);

            // Create reel container
            const reelContainer = document.createElement('div');
            reelContainer.className = 'card-reel-container';

            const reelWrapper = document.createElement('div');
            reelWrapper.className = 'reel-wrapper';

            // Create two columns
            const colUp = document.createElement('div');
            colUp.className = 'reel-column scroll-up';
            const colDown = document.createElement('div');
            colDown.className = 'reel-column scroll-down';

            reelWrapper.appendChild(colUp);
            reelWrapper.appendChild(colDown);
            reelContainer.appendChild(reelWrapper);

            card.appendChild(titleContainer);
            card.appendChild(reelContainer);

            // Fetch and append images
            const images = await fetchImages(categoryKey);

            // Split images between columns (3 each)
            const mid = Math.ceil(images.length / 2);
            const upImages = images.slice(0, mid);
            const downImages = images.slice(mid);

            // Helper to populate column and duplicate for seamless loop
            const populateColumn = (col, imgArray) => {
                // Add original set
                imgArray.forEach(src => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = '';
                    img.loading = 'lazy';
                    col.appendChild(img);
                });
                // Duplicate set for seamless scrolling
                imgArray.forEach(src => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = '';
                    img.loading = 'lazy';
                    col.appendChild(img);
                });
            };

            populateColumn(colUp, upImages);
            populateColumn(colDown, downImages);
        }
    }
});

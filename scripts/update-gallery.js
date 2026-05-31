const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function fetchAndSaveGallery(folderName, outputFilename) {
  try {
    console.log(`Fetching images from Cloudinary folder: ${folderName}...`);

    // Fetch images from the specified folder
    // Note: Cloudinary folder search needs exact string match
    // If folder name contains spaces, it should be wrapped in quotes
    const searchExpression = `folder:"${folderName}"`;

    const result = await cloudinary.search
      .expression(searchExpression)
      .with_field('tags')
      .sort_by('public_id', 'desc')
      .max_results(100)
      .execute();

    const resources = result.resources;
    console.log(`Found ${resources.length} images in ${folderName}.`);

    // Ensure data directory exists
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)){
        fs.mkdirSync(dataDir);
    }

    // Write to JSON file
    const outputPath = path.join(dataDir, outputFilename);
    fs.writeFileSync(outputPath, JSON.stringify(resources, null, 2));

    console.log(`Successfully saved gallery data to ${outputPath}`);

  } catch (error) {
    console.error(`Error generating gallery data for ${folderName}:`, error);
    // Don't exit process here so other galleries can attempt to load
  }
}

async function generateAllGalleries() {
    await fetchAndSaveGallery('Sketches', 'sketches.json');
    await fetchAndSaveGallery('Banners', 'banners.json');
    await fetchAndSaveGallery('Posters', 'posters.json');
    await fetchAndSaveGallery('Social_Posts', 'social-posts.json');
    await fetchAndSaveGallery('Social_Stories', 'social-stories.json');
    await fetchAndSaveGallery('Social_Thumbnails', 'social-thumbnails.json');
    await fetchAndSaveGallery('Digital_art', 'digital_art.json');
    await fetchAndSaveGallery('Logos', 'logos.json');
    await fetchAndSaveGallery('Visiting_cards', 'visiting_cards.json');

    // Digital Assets
    await fetchAndSaveGallery('Wall_Art', 'wall-art.json');

    // Photography Categories
    await fetchAndSaveGallery('Portraits', 'portraits.json');
    await fetchAndSaveGallery('Nature', 'nature.json');
    await fetchAndSaveGallery('Street', 'street.json');
    await fetchAndSaveGallery('Macro', 'macro.json');
    await fetchAndSaveGallery('Events', 'events.json');
    await fetchAndSaveGallery('Wildlife', 'wildlife.json');
    await fetchAndSaveGallery('Product', 'product.json');
}

generateAllGalleries();

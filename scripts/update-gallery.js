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

    // Fetch images from the specified folder and all sub-folders
    // Note: Cloudinary folder search needs exact string match
    // If folder name contains spaces, it should be wrapped in quotes
    const searchExpression = `folder:"${folderName}/*" OR folder:"${folderName}"`;

    const result = await cloudinary.search
      .expression(searchExpression)
      .sort_by('public_id', 'desc')
      .max_results(100)
      .execute();

    let resources = result.resources;

    // Process resources to extract sub_category based on their folder structure
    resources = resources.map(res => {
      // res.folder contains the path, e.g., 'Visuals/Photography/Nature/Flower'
      // target folderName is e.g., 'Visuals/Photography/Nature'
      // we want to extract 'Flower' as sub_category
      let subCategory = 'Uncategorized';

      // We append '/' to folderName to match exact subfolders
      const prefix = folderName + '/';

      if (res.folder && res.folder.startsWith(prefix)) {
        // e.g. "Visuals/Photography/Nature/Flower" -> "Flower"
        const remainingPath = res.folder.substring(prefix.length);
        const parts = remainingPath.split('/');
        if (parts.length > 0 && parts[0] !== '') {
          subCategory = parts[0];
        }
      }

      return {
        ...res,
        sub_category: subCategory
      };
    });
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
    // Art
    await fetchAndSaveGallery('Art/Sketch Art', 'sketches.json');
    await fetchAndSaveGallery('Art/Digital Art', 'digital_art.json');

    // Design
    await fetchAndSaveGallery('Design/Banners', 'banners.json');
    await fetchAndSaveGallery('Design/Posters', 'posters.json');
    await fetchAndSaveGallery('Design/Logos', 'logos.json');
    await fetchAndSaveGallery('Design/Visiting Cards', 'visiting_cards.json');

    // Social Media Design
    await fetchAndSaveGallery('Social Media Design/Posts', 'social-posts.json');
    await fetchAndSaveGallery('Social Media Design/Stories', 'social-stories.json');
    await fetchAndSaveGallery('Social Media Design/Thumbnails', 'social-thumbnails.json');

    // Digital Assets
    await fetchAndSaveGallery('Digital Assets/Wall Art', 'wall-art.json');

    // Photography Categories
    await fetchAndSaveGallery('Visuals/Photography/Portraits', 'portraits.json');
    await fetchAndSaveGallery('Visuals/Photography/Nature', 'nature.json');
    await fetchAndSaveGallery('Visuals/Photography/Street', 'street.json');
    await fetchAndSaveGallery('Visuals/Photography/Macro', 'macro.json');
    await fetchAndSaveGallery('Visuals/Photography/Events', 'events.json');
    await fetchAndSaveGallery('Visuals/Photography/Wildlife', 'wildlife.json');
    await fetchAndSaveGallery('Visuals/Photography/Product', 'product.json');

    // AI Work
    await fetchAndSaveGallery('AI Work/Digital Art', 'ai-digital-art.json');
    await fetchAndSaveGallery('AI Work/Photorealism', 'ai-photorealism.json');
    await fetchAndSaveGallery('AI Work/Graphic Design', 'ai-graphic-design.json');
    await fetchAndSaveGallery('AI Work/Hybrid Editing', 'ai-hybrid-editing.json');
}

generateAllGalleries();

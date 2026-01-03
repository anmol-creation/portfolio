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

async function generateGalleryData() {
  try {
    console.log('Fetching images from Cloudinary folder: Sketches...');

    // Fetch images from the 'Sketches' folder
    const result = await cloudinary.search
      .expression('folder:Sketches')
      .sort_by('public_id', 'desc')
      .max_results(100)
      .execute();

    const resources = result.resources;
    console.log(`Found ${resources.length} images.`);

    // Ensure data directory exists
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)){
        fs.mkdirSync(dataDir);
    }

    // Write to JSON file
    const outputPath = path.join(dataDir, 'sketches.json');
    fs.writeFileSync(outputPath, JSON.stringify(resources, null, 2));

    console.log(`Successfully saved gallery data to ${outputPath}`);

  } catch (error) {
    console.error('Error generating gallery data:', error);
    process.exit(1);
  }
}

generateGalleryData();

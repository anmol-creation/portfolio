const express = require('express');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// API Endpoint to fetch sketches
app.get('/api/sketches', async (req, res) => {
  try {
    // Fetch images from the 'Sketches' folder
    // Uses Search API (or Admin API resources method)
    // Using Search API is more flexible for filtering by folder
    const result = await cloudinary.search
      .expression('folder:Sketches')
      .sort_by('public_id', 'desc')
      .max_results(100)
      .execute();

    res.json(result.resources);
  } catch (error) {
    console.error('Cloudinary Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch images from Cloudinary' });
  }
});

// Fallback for SPA routing if needed (though this is a static site structure)
// Since we are serving static files, we might want to redirect unknown routes to index.html or 404
// For now, let's just listen.

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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
    // Check for placeholder keys to prevent crash and return mock data for verification
    if (process.env.CLOUDINARY_API_KEY === 'your_api_key_here') {
       console.log('Running in MOCK mode due to placeholder keys.');
       return res.json([
           { public_id: 'mock_sketch_1', format: 'jpg' },
           { public_id: 'mock_sketch_2', format: 'jpg' },
           { public_id: 'mock_sketch_3', format: 'jpg' }
       ]);
    }

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

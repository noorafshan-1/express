const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const multerStorageCloudinary = require('multer-storage-cloudinary').CloudinaryStorage;

const router = express.Router();

// Cloudinary configuration (add your cloudinary credentials)
cloudinary.config({
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret',
});

// Set up multer storage using cloudinary
const storage = new multerStorageCloudinary({
  cloudinary: cloudinary,
  params: {
    folder: 'your-folder-name',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage: storage });

// Route to handle image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { caption } = req.body;
    const imageUrl = req.file.path;  // Get the uploaded image URL

    // Create a post object (save it to your database if necessary)
    const newPost = {
      caption: caption,
      imageUrl: imageUrl,
    };

    // You can save this post object to your database here

    // Return the new post with image URL
    res.status(200).json(newPost);
  } catch (error) {
    console.error('Error uploading post:', error);
    res.status(500).json({ message: 'Failed to upload post' });
  }
});

module.exports = router;


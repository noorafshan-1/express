const Post = require('../models/Post');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.createPost = async (req, res) => {
  const { caption } = req.body;
  const file = req.file;

  try {
    const result = await cloudinary.uploader.upload(file.path);
    const post = await Post.create({
      caption,
      image: result.secure_url,
      user: req.user.id,
    });
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

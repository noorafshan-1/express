const express = require('express');
const multer = require('multer');
const Post = require('../models/Post');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  const { caption } = req.body;
  const imageUrl = req.file.path;

  const post = new Post({ userId: req.user._id, caption, imageUrl });
  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: 'Error creating post' });
  }
});

module.exports = router;

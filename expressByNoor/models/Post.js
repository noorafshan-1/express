const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema(
  {
    caption: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model('Post', PostSchema);

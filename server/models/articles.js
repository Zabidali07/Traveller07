const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
  },
  author: {
    type: String,
    default: "",
  },
  images: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Images",
  },
  imagePath: {
    type: String,
  },
  postedByEmail: {
    type: String,
  },
  cusineImages: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ImageArray",
  },
  cusineImagesPath: {
    type: Array,
  },
  cusineImagesDescription: {
    type: Array,
  },
  visitedPlaceImages: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ImageArray",
  },
  visitedPlacesImagesPath: {
    type: Array,
  },
  visitedPlacesImagesDescription: {
    type: Array,
  },
});

module.exports = mongoose.model("Articles", articleSchema);

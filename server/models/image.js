const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    imageName: {
      type: String,
      required: true,
      default: "",
    },
    imageData: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Images", ImageSchema);

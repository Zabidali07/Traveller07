const mongoose = require("mongoose");

const ImageArraySchema = new mongoose.Schema({
  imgCollection: {
    type: Array,
  },
});

module.exports = mongoose.model("ImageArray", ImageArraySchema);

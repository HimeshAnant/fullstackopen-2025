const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  born: String,
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;

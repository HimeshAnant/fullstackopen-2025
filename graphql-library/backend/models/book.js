const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  published: {
    type: Number,
    required: true,
  },
  genres: [
    {
      type: String,
    },
  ],
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;

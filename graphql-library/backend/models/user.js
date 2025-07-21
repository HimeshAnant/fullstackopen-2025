const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  favoriteGenre: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;

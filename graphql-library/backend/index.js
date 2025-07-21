const { ApolloServer } = require("@apollo/server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("connected to MongoDB");

    await Book.init();
    await Author.init();
    await User.init();
  })
  .catch((error) => {
    console.error("error connecting to MongoDB", error.message);
  });

context: async ({ req }) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");

    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    } catch (error) {
      console.warn("token incorrect or missing", error);
      return {};
    }
  }
};

const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

// for subscription
// --------------------------------------------------------------------------------------------------

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

// --------------------------------------------------------------------------------------------------

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = {};
      if (args.author) query.author = args.author;
      if (args.genre) query.genres = args.genre;

      return Book.find(query).populate("author");
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
    allUsers: async () => {
      const users = await User.find({});
      return users;
    },
  },
  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root._id });
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("token invalid or missing", {
          extensions: {
            code: "UNATHENTICATED",
          },
        });
      }
      console.log(context.currentUser);

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        const newAuthor = new Author({ name: args.author });
        await newAuthor.save();

        author = newAuthor;
      }

      const addedBook = new Book({ ...args, author: author._id });

      try {
        await addedBook.save();
      } catch (error) {
        throw new GraphQLError("saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: addedBook });
      return addedBook.populate("author");
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("token invalid or missing", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      const authorToEdit = await Author.findOne({ name: args.name });
      if (!authorToEdit) return null;

      authorToEdit.born = args.born;

      try {
        await authorToEdit.save();
      } catch (error) {
        throw new GraphQLError("updating author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.born,
            error,
          },
        });
      }

      return authorToEdit;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        return await user.save();
      } catch (error) {
        throw new GraphQLError("user creation failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "sekret") {
        throw new GraphQLError("incorrect username or password", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(userForToken, process.env.TOKEN_SECRET);
      return { value: token };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;

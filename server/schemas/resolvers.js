// importing necessary packages/models
const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  
  Query: {
    me: async (parent, args, context) => {
      // resolver function checks if there is a user object in the context
      if (context.user) {
        // if found one then return the user with the matching ID.
        const userData = await User.findOne({ _id: context.user._id })
        .select('-__v -password')
        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    // defines a resolver for the addUser mutation
    addUser: async (parent, args) => {

      const user = await User.create(args);

      const token = signToken(user);
      return { token, user };
    },

    // defines a resolver for the login mutation
    login: async (parent, { email, password }) => {
      // check if there is an user with the given email
      const user = await User.findOne({ email });
      // if no user found, throws an error message
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      // if found one, it checks if the provided password matches with user's actual password
      const correctPw = await user.isCorrectPassword(password);
      // if passowrd is incorrect, throws an error message
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      // generates token using signToken function and assigns it to the token varialbe
      const token = signToken(user);
      // return an object containing both token and user
      return { token, user };
    },

    // defines a resolver for the saveBook mutation
    saveBook: async (parent,{ newBook }, context) => {
      // checks if there is a user authenticated in the context
      if (context.user) {
        try {
          // assigns an empty string as the default value for the description field if it is not provided.
          
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            // update the savedBooks array by adding a new book object to it.
            { $addToSet: {savedBooks: newBook}},
            // ensures that the updated user object is returned as the result of the mutation.
            { new: true }
          );
          return updatedUser;
        } catch (error) {
          throw new Error("Error saving the book");
        }
      } else {
        // no authenticated user, it throws an AuthenticationError
        throw new AuthenticationError("You need to be logged in!");
      }
    },
    // defines a resolver for the removeBook mutation
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        try {
          //  find the user based on the _id
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            // remove a book from the savedBooks
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          );
          return updatedUser;
        } catch (error) {
          throw new Error("Error removing the book");
        }
      } else {
        throw new AuthenticationError("You need to be logged in!");
      }
    },
  },
};

module.exports = resolvers;
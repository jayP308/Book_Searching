 const { User } = require('../models/User');
 const { signToken } = require('../utils/auth');
 const { AuthenticationError } = require('apollo-server-express');

 const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            // Validating if user is logged in
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
              }

            const userData = await User.findById(context.user._id).select('-__v -password');
            return userData;
        }
    },

    Mutation: {
        // Creating Users or use when user is signing up
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });

            // Validating if user has an account 
            if (!user) {
                throw new AuthenticationError("No user found with this email address");
              }
            
            const correctPw = await user.isCorrectPassword(password);

            // Validating if users password is correct
            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
              }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { newBook }, context) => {
            if (!context.user) {
              throw new AuthenticationError("You need to be logged in!");
            }
      
            try {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: newBook } },
                { new: true }
              );
              return updatedUser;
            } catch (error) {
              throw new Error("Error saving the book");
            }
        },

        removeBook: async (parent, { bookId }, context) => {
            if (!context.user) {
              throw new AuthenticationError("You need to be logged in!");
            }
      
            try {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
              );
              return updatedUser;
            } catch (error) {
              throw new Error("Error removing the book");
            }
        },
    },
 };

 module.exports = resolvers;
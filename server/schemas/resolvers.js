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
    },
 };

 module.exports = resolvers;
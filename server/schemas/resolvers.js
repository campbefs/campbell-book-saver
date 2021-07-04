const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  
  // getSingleUser
  Query: {

    // getSingleUser: async (_parent, { username }) => {
    //   return User.findOne({ username })
    //     .select('-__v -password')
    //     // .populate('savedBooks') // should be part of the single user you are retrieving
    // },

    me: async (_parent, _args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
           // .populate('savedBooks') // should be part of the single user you are retrieving
        
        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

  },

  Mutation: {
    addUser: async (_parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (_parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      // this is a hook in the User model that uses bcrypt
      const correctPw = await user.isCorrectPassword(password); 

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };

    },

    saveBook: async (_parent, { input }, context) => {  // destructure 'input' object from main object
      if (context.user) {
        // console.log(input);
        
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id},
          { $addToSet: { savedBooks: input}},
          { new: true }
        )

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    removeBook: async (_parent, { bookId }, context) => {
      
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId}}},
          { new: true }
        )

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

  }
};

module.exports = resolvers;
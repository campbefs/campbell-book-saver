const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (_parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('savedBooks')
    }
  }
}
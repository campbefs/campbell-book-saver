// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
    bookCount: Int
  }

  type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    authors: [String] # array
    description: String
    title: String
    bookId: String
    image: String
    link: String
  }


  type Query {
    getSingleUser(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeBook(bookId: String!): User
    saveBook(book: BookInput!): User
  }

`;

module.exports = typeDefs;